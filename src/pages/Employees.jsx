import { useState, useEffect } from 'react';
import { employeeService } from '../services/employeeService';
import { Table } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  // Confirm Delete State
  const [deleteId, setDeleteId] = useState(null);

  const limit = 5;

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * limit;
      const data = await employeeService.getAll(limit, skip, search);
      setEmployees(data.users || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page, search]);

  const handleOpenModal = (emp = null) => {
    setSelectedEmp(emp);
    setFormData(emp ? { firstName: emp.firstName, lastName: emp.lastName, email: emp.email, phone: emp.phone } : { firstName: '', lastName: '', email: '', phone: '' });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (selectedEmp) {
        await employeeService.update(selectedEmp.id, formData);
        setEmployees(employees.map(e => e.id === selectedEmp.id ? { ...e, ...formData } : e));
      } else {
        const created = await employeeService.create(formData);
        setEmployees([created, ...employees]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await employeeService.delete(deleteId);
      setEmployees(employees.filter(e => e.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full sm:w-72"
        />
        <Button onClick={() => handleOpenModal()}>+ Add Employee</Button>
      </div>

      <Table
        columns={['Name', 'Email', 'Phone', 'Actions']}
        data={employees}
        isLoading={loading}
        renderRow={(emp) => (
          <tr key={emp.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900">{emp.firstName} {emp.lastName}</td>
            <td className="px-6 py-4">{emp.email}</td>
            <td className="px-6 py-4">{emp.phone}</td>
            <td className="px-6 py-4 flex gap-2">
              <button onClick={() => handleOpenModal(emp)} className="text-blue-600 hover:underline text-xs font-semibold">Edit</button>
              <button onClick={() => setDeleteId(emp.id)} className="text-red-600 hover:underline text-xs font-semibold">Delete</button>
            </td>
          </tr>
        )}
      />

      <Pagination currentPage={page} totalItems={total} pageSize={limit} onPageChange={setPage} />

      {/* Edit/Create Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedEmp ? 'Edit Employee' : 'Add Employee'}>
        <form onSubmit={handleSave} className="space-y-3">
          <Input label="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required />
          <Input label="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} required />
          <Input label="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
          <Input label="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={submitting}>Save</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Employee"
        message="Are you sure you want to remove this employee record?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={submitting}
      />
    </div>
  );
};