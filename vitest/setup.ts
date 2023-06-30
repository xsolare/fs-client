/*
 * Vitest setup function
 */
export async function setup() {
  global.CSS = {
    supports: () => false,
    escape: (str: string) => str
  };

  console.log('📝 vitest global-setup');
}
