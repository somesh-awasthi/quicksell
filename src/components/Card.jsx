import React, { memo } from 'react';
import '../style/Card.css';

export default memo(function Card({ id, title, tags = [], avatarUrl, status, showImage }) {
    return (
        <div className="card">
            <div className="card-id">{id}</div>
            <div className="card-header">
                <h2 className="card-title">{title}</h2>
                {tags.length > 0 && <p className="card-tags">{tags.join(', ')}</p>}
            </div>
            {showImage && (
                <div className="avatar-container">
                    <img className="avatar" src={avatarUrl} alt="Avatar" />
                    {/* Status Indicator */}
                    <div
                        className="status-indicator"
                        style={{ backgroundColor: status ? 'gray' : 'orange' }}
                    ></div>
                </div>
            )}
        </div>
    );
});
