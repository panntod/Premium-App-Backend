declare module "dotenv" {
  interface Dotenv {
    config: () => void;
  }

  const dotenv: Dotenv;

  export default dotenv;
}
