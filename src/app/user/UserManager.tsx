"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

interface UserFormData {
  name: string;
  age: string;
  email: string;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    age: "",
    email: ""
  });

  // 获取所有用户
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user");
      const result = await response.json();
      if (result.success) {
        setUsers(result.data);
      } else {
        alert(result.error || "获取用户失败");
      }
    } catch (error) {
      alert("网络错误");
    } finally {
      setLoading(false);
    }
  };

  // 创建用户
  const createUser = async () => {
    if (!formData.name || !formData.age || !formData.email) {
      alert("请填写完整信息");
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          age: parseInt(formData.age),
          email: formData.email
        })
      });
      
      const result = await response.json();
      if (result.success) {
        await fetchUsers();
        resetForm();
        setDialogOpen(false);
        alert("用户创建成功");
      } else {
        alert(result.error || "创建用户失败");
      }
    } catch (error) {
      alert("网络错误");
    }
  };

  // 更新用户
  const updateUser = async () => {
    if (!editingUser || !formData.name || !formData.age || !formData.email) {
      alert("请填写完整信息");
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          name: formData.name,
          age: parseInt(formData.age),
          email: formData.email
        })
      });
      
      const result = await response.json();
      if (result.success) {
        await fetchUsers();
        resetForm();
        setDialogOpen(false);
        setEditingUser(null);
        alert("用户更新成功");
      } else {
        alert(result.error || "更新用户失败");
      }
    } catch (error) {
      alert("网络错误");
    }
  };

  // 删除用户
  const deleteUser = async (id: number) => {
    if (!confirm("确定要删除这个用户吗？")) {
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      
      const result = await response.json();
      if (result.success) {
        await fetchUsers();
        alert("用户删除成功");
      } else {
        alert(result.error || "删除用户失败");
      }
    } catch (error) {
      alert("网络错误");
    }
  };

  // 重置表单
  const resetForm = () => {
    setFormData({ name: "", age: "", email: "" });
  };

  // 打开创建用户对话框
  const openCreateDialog = () => {
    resetForm();
    setEditingUser(null);
    setDialogOpen(true);
  };

  // 打开编辑用户对话框
  const openEditDialog = (user: User) => {
    setFormData({
      name: user.name,
      age: user.age.toString(),
      email: user.email
    });
    setEditingUser(user);
    setDialogOpen(true);
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser();
    } else {
      await createUser();
    }
  };

  // 组件挂载时获取用户列表
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">用户管理</h1>
        <Button onClick={openCreateDialog}>
          添加用户
        </Button>
      </div>

      {/* 用户列表 */}
      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-8 text-center">加载中...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    姓名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    年龄
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    邮箱
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      暂无用户数据
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(user)}
                        >
                          编辑
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteUser(user.id)}
                        >
                          删除
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 添加/编辑用户对话框 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "编辑用户" : "添加用户"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">姓名</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="请输入姓名"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">年龄</label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="请输入年龄"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">邮箱</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="请输入邮箱"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                取消
              </Button>
              <Button type="submit">
                {editingUser ? "更新" : "创建"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManager; 