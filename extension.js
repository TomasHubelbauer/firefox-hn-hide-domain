/** @type {HTMLTableRowElement[]} */
const trs = document.querySelectorAll('tr.athing');

/** @type {string[]} */
const domains = JSON.parse(localStorage.getItem('domains') ?? '[]');
if (domains.length > 0) {
  console.log(`Hiding stories from ${domains.length} domain(s): ${domains.join(', ')}`);
}
else {
  console.log('No domains to hide stories from have been added yet');
}

for (const tr of trs) {
  const id = tr.id;

  const titleA = tr.querySelector('td.title a');
  if (!titleA) {
    throw new Error(`No title link for #${id}`);
  }

  const title = titleA.textContent;

  const domainA = tr.querySelector('td.title a[href^="from?site="]');
  if (!domainA) {
    throw new Error(`No domain link for #${id} "${title}"`);
  }

  const domain = domainA.textContent;

  const hideA = document.querySelector(`a[href^="hide?id=${id}"]`);
  if (!hideA) {
    throw new Error(`No hide link for #${id} "${title}"`);
  }

  const hideDomainA = document.createElement('a');
  hideDomainA.textContent = `hide ${domain}`;
  hideDomainA.href = location.href;
  hideDomainA.addEventListener('click', () => {
    const domains = JSON.parse(localStorage.getItem('domains') ?? '[]');
    domains.push(domain);
    localStorage.setItem('domains', JSON.stringify(domains));
  });

  hideA.insertAdjacentElement('afterend', hideDomainA);
  hideA.insertAdjacentText('afterend', ' | ');

  if (!domains.includes(domain)) {
    continue;
  }

  if (confirm(`Hide #${id} "${title}" (${domain})?`)) {
    hideA.click();
    alert(`Hid #${id} "${title}" (${domain})`);
  }
  else if (confirm(`Remove ${domain} from the list of hidden domains?`)) {
    const domains = JSON.parse(localStorage.getItem('domains') ?? '[]');
    domains.splice(0, domains.length, ...domains.filter(d => d !== domain));
    localStorage.setItem('domains', JSON.stringify(domains));
  }
}
