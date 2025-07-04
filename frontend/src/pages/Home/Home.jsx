import React from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";


const Home = () => {
    return (
      <>
      <section>
        <Header />
        <Hero />
      </section>
      </>
    )
}

export default Home;



// import React, { useState, useEffect } from "react";

// const Home = () => {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         document.title = 'You clicked ${count} times';
//     }, [count]);

//     return (
//       <div style={{ padding: "20px"}}>
//         <h2>Counter Example</h2>
//         <p>You CLicked {count} times</p>
//         <button 
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Click me
//         </button>
//       </div>
//     );
// };