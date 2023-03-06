import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John C.', salary: 800, increase: false, id: 1},
        {name: 'Alex M.', salary: 3000, increase: true, id: 2},
        {name: 'Carl W.', salary: 5000, increase: false, id: 3}
      ],
      id: 3
    };
  }

  addItem = (itemData) => {
    this.setState(({data, id}) => {
      return {
        data: [...data, {...itemData, increase: false, id: id + 1}],
        id: id + 1
      }
    });
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      
      // ------------- 1 var ---------------
      // const index = data.findIndex(elem => elem.id === id);
      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);
      // const newData = [...before, ...after];

      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  render() {
    return (
      <div className="app">
          <AppInfo />
  
          <div className="search-panel">
              <SearchPanel/>
              <AppFilter/>
          </div>
          
          <EmployeesList data={this.state.data} onDelete={this.deleteItem} />
          <EmployeesAddForm addItem={this.addItem} />
      </div>
    );  
  }
}

export default App;
