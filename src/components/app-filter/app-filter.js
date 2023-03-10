import "./app-filter.css";

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники', colored: false},
        {name: 'rise', label: 'На повышение', colored: false},
        {name: 'more1000', label: 'З/П больше 1000$', colored: true}
    ];
    const buttons = buttonsData.map(({name, label, colored}) => {
        const clazz = (props.filter === name ? 'btn-light' : 'btn-outline-light');
        const style = colored ? {color: '#FF5F13'} : null;
        return (
            <button type="button"
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => props.onFilterSelect(name)}
                    style={style}
                >
                    {label}
            </button>
        )
    })
    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;