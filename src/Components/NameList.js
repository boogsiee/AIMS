import React from 'react'
import { Link } from 'react-router-dom';

const NameList = () => {
  return (
    <div>
        <Link to="/profile" type="button">
            <h4>Carla Magsipoc</h4>
        </Link>
        <Link to="/profile" type="button">
            <h4>Mela Amboboyog</h4>
        </Link>
        <Link to="/profile" type="button">
            <h4>Charlotte Constantino</h4>
        </Link>
        <Link to="/profile" type="button">
            <h4>Zyrell Jones Baylon</h4>
        </Link>
    </div>
  )
}

export default NameList