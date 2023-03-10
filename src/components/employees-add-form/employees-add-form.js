import './employees-add-form.scss';
import {Component} from 'react';

class EmployeesAddForm extends Component {

    constructor (props) {
        super (props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const inputName = this.state.name.trim(), inputSalary = this.state.salary.trim();
        if (inputName.length !== 0 && inputSalary.length !== 0) {            
            this.props.addItem({ name: inputName, salary: inputSalary });
            this.setState({
                name: '',
                salary: ''
            });
        }
    }

    render() {
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form onSubmit={this.onSubmit}
                    className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?" 
                        name = "name" 
                        value = {name}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?" 
                        name = "salary" 
                        value = {salary}
                        onChange={this.onValueChange} />
    
                    <button type="submit" 
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;