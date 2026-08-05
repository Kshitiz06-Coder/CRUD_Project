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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const limit = 5;

  useEffect(() => {
    let cancelled = false;

    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const skip = (page - 1) * limit;
        const data = await employeeService.getAll(limit, skip, search);
        if (!cancelled) {
          setEmployees(data.users || []);
          setTotal(data.total || 0);
        }
      } catch (err) {
        console.error('Error fetching employees:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchEmployees();

    return () => {
      cancelled = true;
    };
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Employees</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage your team members and their details.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="self-start sm:self-auto">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </Button>
      </div>

      <div className="relative w-full sm:w-96">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-10"
        />
      </div>

      <Table
        columns={['Employee', 'Email', 'Phone', 'Actions']}
        data={employees}
        isLoading={loading}
        renderRow={(emp) => (
          <tr key={emp.id} className="group hover:bg-slate-50/80 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  {emp.firstName?.[0]}{emp.lastName?.[0]}
                </div>
                <span className="font-semibold text-slate-900">{emp.firstName} {emp.lastName}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-slate-600">{emp.email}</td>
            <td className="px-6 py-4 text-slate-600">{emp.phone}</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleOpenModal(emp)} 
                  className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                  title="Edit"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setDeleteId(emp.id)} 
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delete"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        )}
      />

      <Pagination currentPage={page} totalItems={total} pageSize={limit} onPageChange={setPage} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedEmp ? 'Edit Employee' : 'Add Employee'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required />
            <Input label="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} required />
          </div>
          <Input label="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
          <Input label="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={submitting}>Save Employee</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Employee"
        message="Are you sure you want to remove this employee record? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={submitting}
      />
    </div>
  );
};