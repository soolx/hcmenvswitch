const envList = [
  {
    id: 'test',
    protocol: 'http',
    prefix: 'gateway-staging',
    host: 'mokahr.com'
  },
  {
    id: 'test2',
    protocol: 'http',
    prefix: 'gateway-staging2',
    host: 'mokahr.com'
  },
  {
    id: 'test3',
    protocol: 'http',
    prefix: 'gateway-staging3',
    host: 'mokahr.com'
  },
  {
    id: 'test4',
    protocol: 'http',
    prefix: 'gateway-staging4',
    host: 'mokahr.com'
  },
  {
    id: 'test5',
    protocol: 'http',
    prefix: 'gateway-staging5',
    host: 'mokahr.com'
  },
  {
    id: 'test6',
    protocol: 'http',
    prefix: 'gateway-staging6',
    host: 'mokahr.com'
  },
  {
    id: 'pre',
    protocol: 'https',
    prefix: 'gateway-pre',
    host: 'mokahr.com'
  },
  {
    id: 'pre2',
    protocol: 'https',
    prefix: 'gateway-pre2',
    host: 'mokahr.com'
  },
  {
    id: 'dev',
    protocol: 'http',
    prefix: 'gateway-dev',
    host: 'mokahr.com'
  },
  {
    id: 'core',
    protocol: 'https',
    prefix: 'gateway',
    host: 'mokahr.com'
  }
]

function bindClick(env, protocol = 'http', prefix = 'gateway-dev', host = 'mokahr.com') {
  const dom = document.getElementById(env);
  let url = `${protocol}://${prefix}.${host}`;
  dom.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: `localStorage.setItem("hcmEnvUrl", "${url}");localStorage.setItem("hcmEnvName", "${env}");`});
    });
    document.getElementById("currentEnv").innerText = env;
  };
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {code: `localStorage.getItem("hcmEnvName");`},
    function(value) {
      document.getElementById("currentEnv").innerText = value || 'Default';
    });
});
// document.getElementById("currentEnv").innerText = localStorage.getItem("hcmEnvName") || 'Default';


envList.forEach(item => {
  const { id, protocol, prefix, host } = item;
  bindClick(id, protocol, prefix, host);
})
