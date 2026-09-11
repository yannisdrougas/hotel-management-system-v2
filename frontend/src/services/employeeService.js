import api from "../api/api";

// =====================================================
// GET ALL EMPLOYEES
// =====================================================

export const getEmployees = () => {

    return api.get("/employees");

};


// =====================================================
// GET EMPLOYEE BY ID
// =====================================================

export const getEmployeeById = (id) => {

    return api.get(`/employees/${id}`);

};


// =====================================================
// CREATE EMPLOYEE
// =====================================================

export const createEmployee = (employee) => {

    return api.post("/employees", employee);

};


// =====================================================
// UPDATE EMPLOYEE
// =====================================================

export const updateEmployee = (id, employee) => {

    return api.put(`/employees/${id}`, employee);

};


// =====================================================
// DELETE EMPLOYEE
// =====================================================

export const deleteEmployee = (id) => {

    return api.delete(`/employees/${id}`);

};


// =====================================================
// FIND EMPLOYEES BY LAST NAME
// =====================================================

export const getEmployeesByLastName = (lastName) => {

    return api.get(
        `/employees/lastname/${lastName}`
    );

};


// =====================================================
// FIND EMPLOYEES BY POSITION
// =====================================================

export const getEmployeesByPosition = (position) => {

    return api.get(
        `/employees/position/${position}`
    );

};