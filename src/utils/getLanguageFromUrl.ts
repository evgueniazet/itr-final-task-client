export const getLanguageFromUrl = (pathname: string) => {
    const match = pathname.match(/^\/(en|ru)(\/|$)/);
    const language = match ? match[1] : '';
    return language;
};
