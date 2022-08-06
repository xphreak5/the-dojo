const filterList = ["all", "mine", "development", "marketing", "sales", "design"]


const ProjectFilter = ({ currentFilter, setCurrentFilter }) => {

  const handleClick = newFilter => {
    setCurrentFilter(newFilter)
  }

  return (
    <div className='project-filter'>
      <p>Filter by:</p>
      <nav>
        {filterList.map((f) => (
          <button 
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default ProjectFilter;
