import React, { useState } from 'react'

interface IProps {
  statusQueryUpdated: (withoutPassed: boolean) => any
}

const StatusFilterPassed: React.FunctionComponent<IProps> = ({
  statusQueryUpdated,
}) => {
  const [checked, setChecked] = useState(false)
  const handleClick = () => {
    const newState = !checked
    setChecked(newState)
    statusQueryUpdated(newState)
  }

  return (
    <label>
      <input
        onChange={event => event}
        onClick={handleClick}
        checked={checked}
        type="checkbox"
      />
      Hide passed scenarios
    </label>
  )
}

// const StatusFilterPassed: React.FunctionComponent<IProps> =({statusQueryUpdated}) => {

// class Checkbox extends React.Component {
//     state = { checked: false }
//     handleChange = (event: any) => {
//         this.setState({ checked: event.target.checked })
//         if(event.target.checked) {
//             statusQueryUpdated(withoutPassed)
//         }
//     }
// }

// return (

// <div className="cucumber-status-filter">
//     <input
//     type="checkbox"
//     id="withoutPassed"
//     checked={this.state.checked}
//     onChange={this.handleChange}/>
//     <label htmlFor="withoutPassed">Without Passed</label>
// </div>
// )
// }

export default StatusFilterPassed
