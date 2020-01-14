import React from 'react';

const Home = props => {
  const { profile } = props;
  return (
    <div>
      <h1>Welcome {profile.uid} ({profile.name})</h1>
      <button onClick={props.handler}> Logout </button>
    </div>
  )
}

export default Home;