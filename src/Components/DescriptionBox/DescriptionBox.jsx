import React from 'react';
import './DescriptionBox.css';

function DescriptionBox(props) {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Review (122)</div>
      </div>

      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, praesentium. A cumque
          dignissimos deserunt eius velit quas eum, repellat officia molestiae est atque incidunt
          commodi itaque quisquam, reiciendis corporis voluptatum.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, praesentium. A cumque
          dignissimos deserunt eius velit quas eum, repellat officia molestiae est atque incidunt
          commodi itaque quisquam, reiciendis corporis voluptatum.
        </p>
      </div>
    </div>
  );
}

export default DescriptionBox;
