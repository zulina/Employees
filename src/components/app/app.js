import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: "John C.", salary: 800, increase: false, rise: true, id: 1 },
                { name: "Alex M.", salary: 3000, increase: true, rise: false, id: 2 },
                { name: "Carl W.", salary: 5000, increase: false, rise: false, id: 3 },
            ],
            id: 3,
            term: '',
            filter: 'all'
        };
    }

    addItem = (itemData) => {
        this.setState(({ data, id }) => {
            return {
                data: [...data, { ...itemData, increase: false, rise: false, id: id + 1 }],
                id: id + 1,
            };
        });
    };

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter((item) => item.id !== id)
            };
            // ------------- 2 var ---------------
            // const index = data.findIndex(elem => elem.id === id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newData = [...before, ...after];
        });
    };

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]};
                }
                return item;
            })
        }));
        // ------------ 2 var ----------
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);
        //     const oldItem = data[index];
        //     const newItem = {...oldItem, increase: !oldItem.increase};
        //     const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        //     return { data: newData };
        // });
    };

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'more1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onChangeSalary = (id, value) => {
        this.setState(({data}) => ({
          data: data.map(item => {
            if (item.id === id) {
              return {...item, salary: value}
            }
            return item;
          })
        }));
      }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}
                />
                <EmployeesAddForm addItem={this.addItem} />
            </div>
        );
    }

}

export default App;
