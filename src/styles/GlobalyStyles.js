import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

 :root{

    /* Light mode */
    --color-primary: #E8E8E8;
    --color-secondary:#000;
    --color-text-black: #000;

    --font-size-sm:0.85rem;
    --font-size-md:1rem;
    --font-size-lg:1.5rem;
    
 }

 html {
    scroll-behavior: smooth;
  }

*,*::before,*::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

body{
  
  font-family: "Poppins", sans-serif;
  background-color: var(--color-primary);
  line-height: 1.5;
  font-size: var(--font-size-md);
  padding:1rem 0.25rem;
  color:var(--color-text-black) ;
}

h2{
  font-size: 1.5rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  background-color: var(--color-primary);
  border: none;
  padding: 0.5 1rem;
}

select{
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}



a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}



.calendar-layout p{
  text-align: center;
}



  .underline{
    text-decoration: underline;
  }

 .spinner {
  margin: 3.2rem auto 1.6rem;
  width: 60px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 6px solid rgba(0,0,0,0.1);
  border-top-color: var(--color-primary);
  animation: spin 1.2s linear infinite, pulse 1.6s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0px rgba(0,0,0,0.1); }
  50% { box-shadow: 0 0 12px rgba(0,0,0,0.2); }
}



@media screen and (max-width:550px){
  h2{
     font-size: 1rem
  }
  p{
    font-size:0.85rem
  }
}

`;

export default GlobalStyles;

