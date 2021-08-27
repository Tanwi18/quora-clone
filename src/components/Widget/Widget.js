import React from 'react';
import './Widget.css';
import WidgetOption from './WidgetOptions/WidgetOption';

function Widget() {
    return (
      <div className="widget">
        <div className="widget__header">
          <h5>Spaces to follow</h5>
        </div>
        <div className="widget__options">
          <WidgetOption />
        </div>
      </div>
    );
  }

export default Widget;