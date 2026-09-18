// src/shared/api.ts
var Endpoint = {
  GetCounter: "api/counter",
  IncCounter: "api/counter/inc",
  OnAppInstall: "internal/on/app/install",
  OnMenuNewPost: "internal/on/menu/new-post"
};
var EndpointMethod = {
  [Endpoint.GetCounter]: "GET",
  [Endpoint.IncCounter]: "POST",
  [Endpoint.OnAppInstall]: "POST",
  [Endpoint.OnMenuNewPost]: "POST"
};

// src/client/fetch.ts
async function fetchGetCounter() {
  let rsp;
  try {
    rsp = await fetch(Endpoint.GetCounter, {
      headers: { Accept: "application/json" }
    });
  } catch (err) {
    const msg = `HTTP error: ${err instanceof Error ? err.message : err}`;
    console.error(msg);
    return;
  }
  if (!rsp.ok) {
    const text = await rsp.text().catch(() => "");
    const err = `HTTP status ${rsp.status}: ${rsp.statusText}; ${text}`;
    console.error(err);
    return;
  }
  return await rsp.json();
}
async function fetchIncCounter(amount) {
  const req = { amount };
  let rsp;
  try {
    rsp = await fetch(Endpoint.IncCounter, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(req)
    });
  } catch (err) {
    const msg = `HTTP error: ${err instanceof Error ? err.message : err}`;
    console.error(msg);
    return;
  }
  if (!rsp.ok) {
    const text = await rsp.text().catch(() => "");
    const err = `HTTP status ${rsp.status}: ${rsp.statusText}; ${text}`;
    console.error(err);
    return;
  }
  return await rsp.json();
}

// src/client/game.ts
async function init() {
  const counter = document.getElementById("counter");
  const incBtn = document.getElementById("inc-btn");
  const decBtn = document.getElementById("dec-btn");
  incBtn.addEventListener("click", () => void incCount(counter, 1));
  decBtn.addEventListener("click", () => void incCount(counter, -1));
  const rsp = await fetchGetCounter();
  counter.value = rsp ? `${rsp.count}` : "Error";
}
async function incCount(counter, amount) {
  const inc = await fetchIncCounter(amount);
  counter.value = inc ? `${inc.count}` : "Error";
}
void init();
//# sourceMappingURL=game.js.map
