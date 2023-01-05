const WS_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin.replace(/^http/, "ws")
    : "ws://localhost:4000";

const client = new WebSocket(WS_URL);

client.onopen = async ()=> {
    console.log('backend socket server connected!');
    await client.send(JSON.stringify(["GetCategories","/"]));
    await client.send(JSON.stringify(["GetProductsByCategory","all"]));
    console.log("finish init");
}


export default client