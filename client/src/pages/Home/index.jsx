import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { redirect } from 'react-router-dom';

// [...Array(20)].map((_, index) => (
//     <div key={index}>
//         <h1>Home</h1>
//     </div>
// ))

function Home() {

    return (
        [...Array(20)].map((_, index) => (
            <div key={index}>
                <h1>Home</h1>
            </div>
        ))
    );
};

export default Home;
