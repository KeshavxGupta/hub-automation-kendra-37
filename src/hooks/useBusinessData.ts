import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface BusinessMetrics {
  pendingTasks: number;
  expenseTotal: number;
  documentsProcessed: number;
  activeAutomations: number;
  lastUpdated: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  amount: string;
  status: 'processed' | 'pending' | 'error';
  date: string;
  extractedData?: any;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

export const useBusinessData = () => {
  const [metrics, setMetrics] = useLocalStorage<BusinessMetrics>('businessMetrics', {
    pendingTasks: 12,
    expenseTotal: 124500,
    documentsProcessed: 48,
    activeAutomations: 6,
    lastUpdated: new Date().toISOString()
  });

  const [documents, setDocuments] = useLocalStorage<Document[]>('documents', [
    {
      id: '1',
      name: 'Invoice_ABC_Corp_2024.pdf',
      type: 'Invoice',
      amount: '₹45,000',
      status: 'processed',
      date: '2 hours ago'
    },
    {
      id: '2',
      name: 'Receipt_Office_Supplies.jpg',
      type: 'Receipt',
      amount: '₹2,500',
      status: 'pending',
      date: '4 hours ago'
    },
    {
      id: '3',
      name: 'Contract_XYZ_Ltd.pdf',
      type: 'Contract',
      amount: '₹1,20,000',
      status: 'processed',
      date: '1 day ago'
    }
  ]);

  const [notifications, setNotifications] = useLocalStorage<Notification[]>('notifications', [
    {
      id: '1',
      title: 'New invoice requires approval',
      message: 'Invoice from ABC Corp for ₹45,000 needs your review',
      type: 'warning',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: '2',
      title: 'Monthly report ready',
      message: 'Your expense report for March is ready for download',
      type: 'info',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: '3',
      title: 'Automation successful',
      message: '15 email responses were automated successfully',
      type: 'success',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        documentsProcessed: prev.documentsProcessed + Math.floor(Math.random() * 2),
        lastUpdated: new Date().toISOString()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [setMetrics]);

  const addDocument = (doc: Omit<Document, 'id'>) => {
    const newDoc = {
      ...doc,
      id: Date.now().toString()
    };
    setDocuments(prev => [newDoc, ...prev]);
    setMetrics(prev => ({
      ...prev,
      documentsProcessed: prev.documentsProcessed + 1,
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateDocumentStatus = (id: string, status: Document['status']) => {
    setDocuments(prev => 
      prev.map(doc => doc.id === id ? { ...doc, status } : doc)
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const unreadNotifications = notifications.filter(n => !n.read);

  return {
    metrics,
    documents,
    notifications,
    unreadNotifications,
    addDocument,
    updateDocumentStatus,
    addNotification,
    markNotificationRead,
    setMetrics
  };
};