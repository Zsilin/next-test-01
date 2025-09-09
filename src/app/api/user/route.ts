import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// 查询所有用户
export async function GET(request: NextRequest) {
  try {
    console.log("获取用户");
    const allUsers = await db.select().from(users);
    console.log("allUsers", allUsers);
    return NextResponse.json({ success: true, data: allUsers });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "获取用户失败" },
      { status: 500 }
    );
  }
}

// 创建用户
export async function POST(request: NextRequest) {
  try {
    const { name, age, email } = await request.json();

    if (!name || !age || !email) {
      return NextResponse.json(
        { success: false, error: "请填写完整的用户信息" },
        { status: 400 }
      );
    }

    const [newUser] = await db
      .insert(users)
      .values({ name, age, email })
      .returning();

    return NextResponse.json({ success: true, data: newUser });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "创建用户失败" },
      { status: 500 }
    );
  }
}

// 更新用户
export async function PUT(request: NextRequest) {
  try {
    const { id, name, age, email } = await request.json();

    if (!id || !name || !age || !email) {
      return NextResponse.json(
        { success: false, error: "请填写完整的用户信息" },
        { status: 400 }
      );
    }

    const [updatedUser] = await db
      .update(users)
      .set({ name, age, email })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "用户不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "更新用户失败" },
      { status: 500 }
    );
  }
}

// 删除用户
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "请提供用户ID" },
        { status: 400 }
      );
    }

    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, error: "用户不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedUser });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "删除用户失败" },
      { status: 500 }
    );
  }
}
