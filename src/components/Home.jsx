import React, { useState } from 'react';
import Body from './Body';
import Navbar from './Navbar';
import '../style/Home.css';

export default function Home() {
  const [grouping, setGrouping] = useState('By Status');
  const [sortOption, setSortOption] = useState('Priority');

  return (
    <div className="home">
      <Navbar setGrouping={setGrouping} setSortOption={setSortOption} />
      <Body grouping={grouping} sortOption={sortOption} />
    </div>
  );
}
