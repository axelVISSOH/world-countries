export const updateThemeLink = (href: string, id: string) => {
  
  let linkElement = document.getElementById(id) as HTMLLinkElement;

  if (linkElement) {
    linkElement.href = href;
  } else {
    linkElement = document.createElement('link');
    linkElement.id = id;
    linkElement.rel = 'stylesheet';
    linkElement.href = href;
    document.head.appendChild(linkElement);
  }

};