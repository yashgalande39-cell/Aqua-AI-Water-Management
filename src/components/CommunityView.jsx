import { Trophy, Award, Star, Users, Leaf, ThumbsUp } from 'lucide-react';

function CommunityView() {
  const leaderboard = [
    { rank: 1, name: 'Block A, Apt 405', score: 980, saving: '420L' },
    { rank: 2, name: 'Block C, Apt 102', score: 955, saving: '380L' },
    { rank: 3, name: 'Block B, Apt 301', score: 920, saving: '350L' },
    { rank: 4, name: 'Block A, Apt 204', score: 890, saving: '310L' },
    { rank: 5, name: 'Block C, Apt 505', score: 850, saving: '290L' },
  ];

  return (
    <div className="view-container">
      <h2 className="mb-4">Community Impact & Leaderboard</h2>
      
      <div className="grid-cols-3 mb-5">
        <div className="card text-center" style={{ borderColor: '#ffd700' }}>
          <Award size={48} className="mx-auto mb-2" style={{ color: '#ffd700' }} />
          <h3>Current Champion</h3>
          <p>Block A, Apt 405</p>
          <div className="text-primary mt-2">Saved 2,400L this month</div>
        </div>
        
        <div className="card col-span-2 flex-center bg-success">
          <div className="flex-center gap-5">
             <div className="text-center">
              <Leaf size={32} className="text-success mb-2 mx-auto" />
              <h3>45,000L</h3>
              <p>Total Community Saving</p>
            </div>
            <div style={{ width: '2px', height: '60px', background: 'var(--border-color)' }}></div>
            <div className="text-center">
              <Users size={32} className="text-primary mb-2 mx-auto" />
              <h3>120+</h3>
              <p>Active Families</p>
            </div>
            <div style={{ width: '2px', height: '60px', background: 'var(--border-color)' }}></div>
            <div className="text-center">
              <Star size={32} className="text-warning mb-2 mx-auto" />
              <h3>Level 14</h3>
              <p>Society Rank</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-cols-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title"><Trophy size={20} className="text-warning" /> Conservation Leaderboard</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>Updated 5m ago</div>
          </div>
          <div className="leaderboard-list mt-4">
            {leaderboard.map(item => (
              <div key={item.rank} className={`rank-item rank-${item.rank}`}>
                <div className="rank-number">{item.rank}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500' }}>{item.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--slate)' }}>Saving: {item.saving}</div>
                </div>
                <div className="flex-center gap-2">
                  <div style={{ fontWeight: 'bold', color: 'var(--primary-green)' }}>{item.score} pts</div>
                  <Award size={16} className="text-success" />
                </div>
              </div>
            ))}
          </div>
          <button className="tab w-100 mt-4" style={{ width: '100%' }}>See Full Rankings</button>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">My Achievements</div>
          </div>
          <div className="grid-cols-2 mt-4">
            <div className="card bg-primary text-center" style={{ padding: '1rem' }}>
              <ThumbsUp size={24} className="mx-auto mb-2 text-primary" />
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Leak Spotter</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--slate)' }}>Found 2 leaks</div>
            </div>
            <div className="card bg-success text-center" style={{ padding: '1rem' }}>
              <Leaf size={24} className="mx-auto mb-2 text-success" />
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Eco Warrior</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--slate)' }}>30 day streak</div>
            </div>
            <div className="card text-center" style={{ padding: '1rem', opacity: 0.4 }}>
              <Star size={24} className="mx-auto mb-2" />
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Hydro Master</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--slate)' }}>Locked</div>
            </div>
            <div className="card text-center" style={{ padding: '1rem', opacity: 0.4 }}>
              <Trophy size={24} className="mx-auto mb-2" />
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Top 1%</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--slate)' }}>Locked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityView;
