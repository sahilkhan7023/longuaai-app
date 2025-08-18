import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Star, Flame, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import apiService from '@/services/apiService';

const LeaderboardPage = () => {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('all');
  const [limit, setLimit] = useState(50);

  // Fetch leaderboard data
  const fetchLeaderboard = async (selectedTimeframe = timeframe, selectedLimit = limit) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.get(`/user/leaderboard?timeframe=${selectedTimeframe}&limit=${selectedLimit}`);
      
      if (response.data) {
        setLeaderboardData(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
      setError('Failed to load leaderboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    fetchLeaderboard(newTimeframe, limit);
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gradient-to-r from-blue-400 to-blue-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Loading leaderboard...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => fetchLeaderboard()} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-lg text-gray-600">
            See how you rank against other learners
          </p>
        </div>

        {/* User's Current Rank */}
        {leaderboardData?.userRank && (
          <Card className="glass-card mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">Your Rank</h3>
                    <p className="text-gray-600">#{leaderboardData.userRank} out of {leaderboardData.totalUsers} learners</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold text-lg">{user?.totalXP || 0} XP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-600">{user?.currentStreak || 0} day streak</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeframe Selection */}
        <Card className="glass-card mb-6">
          <CardContent className="p-6">
            <Tabs value={timeframe} onValueChange={handleTimeframeChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="all">All Time</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6" />
              <span>Top Learners</span>
              <Badge variant="secondary">{leaderboardData?.leaderboard?.length || 0} users</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {leaderboardData?.leaderboard?.length > 0 ? (
              <div className="space-y-2">
                {leaderboardData.leaderboard.map((learner, index) => (
                  <div
                    key={learner.username}
                    className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                      learner.username === user?.username ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className="flex-shrink-0 w-12 flex justify-center">
                        {getRankIcon(learner.rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={learner.avatar} />
                        <AvatarFallback>
                          {learner.username?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">
                            {learner.username}
                            {learner.username === user?.username && (
                              <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                            )}
                          </h4>
                          {learner.rank <= 3 && (
                            <Badge className={`text-white text-xs ${getRankBadgeColor(learner.rank)}`}>
                              Top {learner.rank}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Level {learner.level}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{learner.totalXP.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="text-sm text-gray-600">{learner.currentStreak}</span>
                        </div>
                      </div>
                      {/* Badges */}
                      {learner.badges && learner.badges.length > 0 && (
                        <div className="flex justify-end space-x-1 mt-1">
                          {learner.badges.slice(0, 3).map((badge, badgeIndex) => (
                            <Badge key={badgeIndex} variant="outline" className="text-xs">
                              {badge.icon} {badge.name}
                            </Badge>
                          ))}
                          {learner.badges.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{learner.badges.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No leaderboard data available</p>
                <Button onClick={() => fetchLeaderboard()} variant="outline" className="mt-4">
                  Refresh
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Load More Button */}
        {leaderboardData?.leaderboard?.length >= limit && (
          <div className="text-center mt-6">
            <Button 
              onClick={() => {
                const newLimit = limit + 50;
                setLimit(newLimit);
                fetchLeaderboard(timeframe, newLimit);
              }}
              variant="outline"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
