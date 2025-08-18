import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        // If the response is not JSON, it might still be a valid non-200 response
        // or an empty response for a successful operation that doesn't return JSON.
        // For now, we'll treat it as an unexpected error if response.ok is false.
        if (!response.ok) {
          setError('An unexpected error occurred: Server did not return valid JSON.');
          return;
        }
        // If response.ok is true but no JSON, proceed as if successful (e.g., 204 No Content)
        data = {}; // Provide an empty object to avoid further errors
      }

      if (response.ok) {
        // Store admin token
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        // Handle non-OK responses from the server (e.g., invalid credentials)
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      
      // This catch block should primarily handle network errors or issues before the server response.
      // If the server responds with a non-200 status, it's handled in the `if (response.ok)` block.
      // The demo credentials logic should ideally be removed or handled differently in a production app.
      // For now, we'll keep it but ensure it doesn't interfere with actual backend responses.
      
      // Check if the error is due to a network issue (e.g., server unreachable)
      // This is a simplified check; a more robust solution might inspect error.name or error.message
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        if (formData.email === 'admin@linguaai.com' && formData.password === 'admin123') {
          const demoAdmin = {
            id: 'admin1',
            email: 'admin@linguaai.com',
            name: 'System Administrator',
            role: 'super_admin'
          };
          
          localStorage.setItem('adminToken', 'demo_admin_token');
          localStorage.setItem('adminUser', JSON.stringify(demoAdmin));
          navigate('/admin/dashboard');
        } else {
          setError('Network error. For demo, use: admin@linguaai.com / admin123');
        }
      } else {
        // For other types of errors (e.g., unexpected JavaScript errors), display a generic error
        setError('An unexpected error occurred during login.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card border-slate-700 bg-slate-800/50 backdrop-blur-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Admin Portal
            </CardTitle>
            <p className="text-slate-300 mt-2">
              Sign in to access the administration panel
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-600 bg-red-900/20">
                  <AlertDescription className="text-red-300">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email Address
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="admin@linguaai.com"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
              <h4 className="text-sm font-medium text-slate-200 mb-2">Demo Credentials:</h4>
              <div className="text-xs text-slate-300 space-y-1">
                <div>Email: admin@linguaai.com</div>
                <div>Password: admin123</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
              >
                ← Back to Main Site
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;


