import React from 'react';
import './Widget.css';
import WidgetOption from './WidgetOptions/WidgetOption';

const Widget = () => {
    return (
        <div className="widget">
            <WidgetOption></WidgetOption>
        </div>
    );
};

export default Widget;