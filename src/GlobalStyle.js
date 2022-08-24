import { Global, css } from '@emotion/react';
import 'modern-normalize';

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
        }
        ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        img {
          display: block;
          width: 100%;
        }
        button {
          cursor: pointer;
        }
        [id='root'] {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 16px;
          padding-bottom: 24px;
        }
      `}
    />
  );
}
