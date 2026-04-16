"use client"
import AuthProvider from "../context/authContext.js"

<AuthProvider>
  <StyledComponentsRegistry>
    <GlobalStyle />
    {Children}
  </StyledComponentsRegistry>
</AuthProvider>