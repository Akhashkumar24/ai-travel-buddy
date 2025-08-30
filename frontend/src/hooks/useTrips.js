// src/hooks/useTrips.js
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

export const useTrips = (filters = {}) => {
  return useQuery(
    ['trips', filters],
    () => apiService.getTrips(filters),
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

export const useTrip = (tripId) => {
  return useQuery(
    ['trip', tripId],
    () => apiService.getTrip(tripId),
    {
      enabled: !!tripId,
      refetchOnWindowFocus: false,
    }
  );
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  
  return useMutation(apiService.createTrip, {
    onSuccess: () => {
      queryClient.invalidateQueries('trips');
      toast.success('Trip created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create trip');
    }
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ id, data }) => apiService.updateTrip(id, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['trip', variables.id]);
        queryClient.invalidateQueries('trips');
        toast.success('Trip updated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update trip');
      }
    }
  );
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();
  
  return useMutation(apiService.deleteTrip, {
    onSuccess: () => {
      queryClient.invalidateQueries('trips');
      toast.success('Trip deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete trip');
    }
  });
};