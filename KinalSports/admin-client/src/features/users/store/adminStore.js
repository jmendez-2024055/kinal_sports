import { create } from 'zustand';
import {
  getFields as getFieldsRequest,
  createField as createFieldRequest,
  updateField as updateFieldRequest,
  deleteField as deleteFieldRequest,
} from '../../../shared/apis';

export const useFieldsStore = create((set, get) => ({
  fields: [],
  loading: false,
  error: null,

  getFields: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getFieldsRequest();
      set({ fields: response.data.data, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || 'Error al listar canchas',
      });
    }
  },

  createField: async (formData) => {
    try {
      set({ loading: true, error: null });
      const response = await createFieldRequest(formData);
      // FIX: get no estaba en los parámetros + fields() tenía paréntesis de más
      set({ fields: [response.data.data, ...get().fields], loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || 'Error al crear la cancha',
      });
    }
  },

  updateField: async (id, formData) => {
    try {
      set({ loading: true, error: null });
      const response = await updateFieldRequest(id, formData);
      // FIX: Id -> id (mayúscula inconsistente), field.id -> field._id
      set({
        fields: get().fields.map((field) => (field._id === id ? response.data.data : field)),
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || 'Error no se encuentra la cancha',
      });
    }
  },

  deleteField: async (id) => {
    try {
      set({ loading: true, error: null });
      await deleteFieldRequest(id);
      set({
        fields: get().fields.filter((field) => field._id !== id),
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || 'Error al eliminar la cancha',
      });
    }
  },
}));
