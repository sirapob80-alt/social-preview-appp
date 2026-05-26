export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
  
    const targetUrl = searchParams.get("url");
  
    if (!targetUrl) {
      return Response.json(
        { error: "Missing URL" },
        { status: 400 }
      );
    }
  
    try {
      const response = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}`
      );
  
      const data = await response.json();
  
      return Response.json(data.data);
    } catch (error) {
      return Response.json(
        { error: "Failed to fetch preview" },
        { status: 500 }
      );
    }
  }