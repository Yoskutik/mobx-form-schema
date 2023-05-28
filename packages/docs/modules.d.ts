declare module '*.example' {
  const value: string;
  export = value;
}

declare module '*.svg' {
  const value: string;
  export = value;
}

declare module 'source-loader!*' {
  const content: {
    filename: string;
    code: string;
  };
  export default content;
}