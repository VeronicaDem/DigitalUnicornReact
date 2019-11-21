import React from 'react';
export default function Error(props) {
    return (
        <div class="error">
            <p>Ошибка.{props.error}</p>
        </div>
    )
}