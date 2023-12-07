import React, { useState } from "react";

interface Department {
  department: string;
  sub_departments: string[];
}

const departments: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const DepartmentList: React.FC = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

  const handleDepartmentSelect = (department: string) => {
    let selectedDeps = [...selectedDepartments];
    if (selectedDeps.includes(department)) {
      selectedDeps = selectedDeps.filter((d) => d !== department);
      setSelectedDepartments(selectedDeps);
    } else {
      selectedDeps.push(department);
      setSelectedDepartments(selectedDeps);
    }

    const selectedSubs = departments
      .filter((dep) => selectedDeps.includes(dep.department))
      .map((dep) => dep.sub_departments)
      .flat();
    const newSelectedSubDepartments = [...new Set([...selectedSubs, ...selectedSubs])];
    setSelectedSubDepartments(newSelectedSubDepartments);
  };

  const handleSubDepartmentSelect = (subDepartment: string) => {
    let selectedSubs = [...selectedSubDepartments];
    if (selectedSubs.includes(subDepartment)) {
      selectedSubs = selectedSubs.filter((sd) => sd !== subDepartment);
      setSelectedSubDepartments(selectedSubs);
    } else {
      selectedSubs.push(subDepartment);
      setSelectedSubDepartments(selectedSubs);
    }

    const selectedDeps = departments
      .filter((department) =>
        department.sub_departments.every((subDep) => selectedSubs.includes(subDep))
      )
      .map((dep) => dep.department);
    const newSelectedDepartments = [...new Set([...selectedDeps, ...selectedDeps])];
    setSelectedDepartments(newSelectedDepartments);
  };

  const handleExpansionToggle = (department: string) => {
    setExpandedDepartments((prevDepartments) =>
      prevDepartments.includes(department)
        ? prevDepartments.filter((dep) => dep !== department)
        : [...prevDepartments, department]
    );
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {departments.map((department) => (
        <li key={department.department}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{ cursor: "pointer", marginRight: "5px" }}
              onClick={() => handleExpansionToggle(department.department)}
            >
              {expandedDepartments.includes(department.department) ? "▼ " : "► "}
            </span>
            <input
              type="checkbox"
              checked={selectedDepartments.includes(department.department)}
              onChange={() => handleDepartmentSelect(department.department)}
            />
            {department.department}
          </div>
          <ul style={{ listStyle: "none", marginLeft: "20px", display: expandedDepartments.includes(department.department) ? "block" : "none" }}>
            {department.sub_departments.map((subDepartment) => (
              <li key={subDepartment}>
                <input
                  type="checkbox"
                  checked={selectedSubDepartments.includes(subDepartment)}
                  onChange={() => handleSubDepartmentSelect(subDepartment)}
                />
                {subDepartment}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default DepartmentList;
