export async function GET(request: Request) {
  // 返回json数据
  return new Response(JSON.stringify({ message: "Hello, world!" }));
}
