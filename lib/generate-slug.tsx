export const generateSlug = (name: string) => {
    const trimmedName = name.trim();
    return trimmedName.toLowerCase().replace(/\s+/g, "-");
};
