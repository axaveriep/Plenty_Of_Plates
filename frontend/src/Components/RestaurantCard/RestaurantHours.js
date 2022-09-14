import React from 'react'

function RestaurantHours({object}) {
    let today;
    if (object.day === 6) {
        today = "Sunday"
    } else if (object.day === 0) {
        today = "Monday"
    } else if (object.day === 1) {
        today = "Tuesday"
    } else if (object.day === 2) {
        today = "Wednesday"
    } else if (object.day === 3) {
        today = "Thursday"
    } else if (object.day === 4) {
        today = "Friday"
    } else if (object.day === 5) {
        today = "Saturday"
    }

    return (
        <div>
            <h4>{today}</h4>
            <p>
                Open: {object.start}<br />
                Close: {object.end}<br />
            </p>
            <hr />
        </div>
    )
}

export default RestaurantHours