import React, { useState } from "react";
import styles from "../styles/DepartmentList.module.css";

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

  return (
    <ul className={styles.outer}>
      {departments.map((department) => (
        <li key={department.department}>
            <details>
                <summary>
                    <h2>›</h2>
                    <input
                        type="checkbox"
                        checked={selectedDepartments.includes(department.department)}
                        onChange={() => handleDepartmentSelect(department.department)}
                    />
                    {department.department.split("_").join(" ")}
                </summary>
                <ul className={styles.inner}>
                    {department.sub_departments.map((subDepartment) => (
                    <li key={subDepartment}>
                        <input
                        type="checkbox"
                        checked={selectedSubDepartments.includes(subDepartment)}
                        onChange={() => handleSubDepartmentSelect(subDepartment)}
                        />
                        {subDepartment.split("_").join(" ")}
                    </li>
                    ))}
                </ul>
            </details>
        </li>
      ))}
    </ul>
  );
};

export default DepartmentList;
