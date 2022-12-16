import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body,
  html {
    width: 100%;
    height: 100%;
    user-select: none;
    background-color: silver;
  }

  body {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(31, 31, 31);
    background-color: rgb(238, 238, 238);
    font-size: 12px;
    font-family: 'Helvetica', 'Arial', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const StyledLogoContainer = styled.div`
  width: 200px;
  margin: 0 auto;

  img {
    height: 200px;
    margin-bottom: 2rem;
  }
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  color: rgb(31, 31, 31);
`;

const StyledSubTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: rgb(31, 31, 31);
`;

const BugReport = styled.a`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  color: rgb(128, 160, 194);
`;

const VersionsTable = styled.table`
  border-collapse: collapse;
  color: rgb(153, 153, 153);
  font-size: 12px;
`;

const Spacer = styled.div`
  margin-bottom: 1rem;
`;

const url = 'https://one.top';

type Props = {
  version: string;
  packageJson: {
    productName: string;
    description: string;
  };
  versions: {
    [key: string]: string;
  };
};

export default function About(props: Props) {
  const {
    version,
    packageJson: { productName, description },
    versions,
  } = props;

  const currentYear = (new Date).getFullYear();

  return (
    <html>
      <head>
        <base href="./" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, initial-scale=1, user-scalable=yes"
        />
        <title>About {productName}</title>
      </head>
      <body>
        <GlobalStyle />
        <StyledLink href={url} target="_blank">
          <StyledLogoContainer>
            <img src="data:img/png;base64,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" />
          </StyledLogoContainer>

          <StyledTitle>
            {productName} {version}
          </StyledTitle>
        </StyledLink>
        <StyledSubTitle>{description}</StyledSubTitle>
        <Spacer />
        <div className="copyright">Copyright (c) {currentYear} One Network</div>
        <Spacer />
        <VersionsTable>
          {versions?.electron && (
            <tr>
              <td>Electron</td>
              <td>{versions?.electron}</td>
            </tr>
          )}
          {versions?.chrome && (
            <tr>
              <td>Chrome</td>
              <td>{versions?.chrome}</td>
            </tr>
          )}
          {versions?.node && (
            <tr>
              <td>Node</td>
              <td>{versions?.node}</td>
            </tr>
          )}
          {versions?.v8 && (
            <tr>
              <td>V8</td>
              <td>{versions?.v8}</td>
            </tr>
          )}
        </VersionsTable>

        <BugReport
          href="https://github.com/xone-network/one-blockchain/issues"
          target="_blank"
        >
          Report an issue
        </BugReport>
        {'{{CSS}}'}
      </body>
    </html>
  );
}
