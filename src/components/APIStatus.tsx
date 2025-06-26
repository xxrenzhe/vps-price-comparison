"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Zap, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";

interface APIHealthStatus {
  status: string;
  responseTime: number;
}

interface HealthData {
  success: boolean;
  status: string;
  providers: {
    bandwagonhost: APIHealthStatus;
    hostinger: APIHealthStatus;
    interserver: APIHealthStatus;
  };
  lastChecked: string;
}

export default function APIStatus() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHealthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/health');
      const data: HealthData = await response.json();
      setHealthData(data);
    } catch (error) {
      console.error('Failed to fetch health status:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealthStatus();
    // 每30秒检查一次API状态
    const interval = setInterval(fetchHealthStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchHealthStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  if (loading && !healthData) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Real-time API Status</span>
            <RefreshCw className="h-3 w-3 animate-spin" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">Checking API status...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Real-time API Status</span>
            {healthData && (
              <Badge className={getStatusColor(healthData.status)}>
                {getStatusIcon(healthData.status)}
                <span className="ml-1 capitalize">{healthData.status}</span>
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchHealthStatus}
            disabled={loading}
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {healthData?.providers && Object.entries(healthData.providers).map(([provider, status]) => (
          <div key={provider} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                status.status === 'healthy' ? 'bg-green-500' :
                status.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
              <span className="text-sm font-medium capitalize">
                {provider === 'bandwagonhost' ? 'BandwagonHost' :
                 provider === 'hostinger' ? 'Hostinger' :
                 provider === 'interserver' ? 'Interserver' : provider}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {status.status === 'healthy' && (
                <span className="text-xs text-gray-500">
                  {status.responseTime}ms
                </span>
              )}
              <Badge
                variant="outline"
                className={`text-xs ${getStatusColor(status.status)}`}
              >
                {status.status === 'healthy' ? 'Online' :
                 status.status === 'error' ? 'Offline' : 'Slow'}
              </Badge>
            </div>
          </div>
        ))}

        {healthData?.lastChecked && (
          <div className="text-xs text-gray-500 pt-2 border-t">
            Last checked: {new Date(healthData.lastChecked).toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
