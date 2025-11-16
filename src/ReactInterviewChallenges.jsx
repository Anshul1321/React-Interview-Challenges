import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight, Bell, Moon, Sun, Trash2, Plus, X, MessageSquare, Send, Filter, Menu, Grip } from 'lucide-react';

const ReactInterviewChallenges = () => {
  const [activeChallenge, setActiveChallenge] = useState(null);

  const challenges = [
    { id: 1, title: "Data Table with Sorting, Search & Pagination" },
    { id: 2, title: "Tree View / Folder Explorer" },
    { id: 3, title: "Dynamic Routing with Breadcrumbs" },
    { id: 4, title: "Notification System" },
    { id: 5, title: "Theme Switcher with Persistence" },
    { id: 6, title: "Drag-and-Drop Kanban Board" },
    { id: 7, title: "Comments Thread with Nested Replies" },
    { id: 8, title: "File Explorer with Lazy Loading" },
    { id: 9, title: "Realtime Chat UI" },
    { id: 10, title: "Dashboard with Draggable Widgets" },
    { id: 11, title: "Filterable & Sortable Data Table" },
    { id: 12, title: "Favorite/Like Button with Optimistic Updates" },
    { id: 13, title: "Rate Limiter/Throttling Logic" },
    { id: 14, title: "Collapsible Accordion Component" },
    { id: 15, title: "Responsive Sidebar Navigation" },
    { id: 16, title: "Infinite Scroll with Intersection Observer" },
    { id: 17, title: "Multi-Step Form with Validation" },
    { id: 18, title: "Auto-Complete Search with Debouncing" },
    { id: 19, title: "Image Gallery with Lightbox & Lazy Loading" },
    { id: 20, title: "Custom Hook: useDebounce & usePrevious" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            React Interview Challenges
          </h1>
          <p className="text-gray-300 text-lg">Complete working solutions for practical React problems</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {challenges.map(challenge => (
            <button
              key={challenge.id}
              onClick={() => setActiveChallenge(challenge.id)}
              className={`p-4 rounded-lg text-left transition-all ${
                activeChallenge === challenge.id
                  ? 'bg-purple-600 shadow-lg scale-105'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <span className="font-semibold text-sm text-purple-300">Challenge {challenge.id}</span>
              <h3 className="text-white mt-1">{challenge.title}</h3>
            </button>
          ))}
        </div>

        <div className="bg-slate-800 rounded-xl p-8 shadow-2xl">
          {activeChallenge === 1 && <DataTableChallenge />}
          {activeChallenge === 2 && <TreeViewChallenge />}
          {activeChallenge === 3 && <DynamicRoutingChallenge />}
          {activeChallenge === 4 && <NotificationSystemChallenge />}
          {activeChallenge === 5 && <ThemeSwitcherChallenge />}
          {activeChallenge === 6 && <KanbanBoardChallenge />}
          {activeChallenge === 7 && <CommentsThreadChallenge />}
          {activeChallenge === 8 && <FileExplorerChallenge />}
          {activeChallenge === 9 && <RealtimeChatChallenge />}
          {activeChallenge === 10 && <DashboardChallenge />}
          {activeChallenge === 11 && <FilterableSortableTable />}
          {activeChallenge === 12 && <OptimisticLikeButton />}
          {activeChallenge === 13 && <RateLimiterChallenge />}
          {activeChallenge === 14 && <AccordionChallenge />}
          {activeChallenge === 15 && <ResponsiveSidebarChallenge />}
          {activeChallenge === 16 && <InfiniteScrollChallenge />}
          {activeChallenge === 17 && <MultiStepFormChallenge />}
          {activeChallenge === 18 && <AutoCompleteChallenge />}
          {activeChallenge === 19 && <ImageGalleryChallenge />}
          {activeChallenge === 20 && <CustomHooksChallenge />}
          {!activeChallenge && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">Select a challenge to see the working solution</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Challenge 1: Data Table with Sorting, Search & Pagination
const DataTableChallenge = () => {
  const [data] = useState([
    { id: 1, name: 'Virat Kohli', email: 'vk@example.com', role: 'Developer', salary: 75000 },
    { id: 2, name: 'MS Dhoni', email: 'ms@example.com', role: 'Designer', salary: 70000 },
    { id: 3, name: 'Rohit Sharma', email: 'rg@example.com', role: 'Manager', salary: 90000 },
    { id: 4, name: 'Chris Gayle', email: 'boss@example.com', role: 'Developer', salary: 80000 },
    { id: 5, name: 'Sachin Tendulker', email: 'st@example.com', role: 'Designer', salary: 72000 },
    { id: 6, name: 'Jasprit Bumrah', email: 'jp@example.com', role: 'Developer', salary: 85000 },
    { id: 7, name: 'Hardik Pandya', email: 'hp@example.com', role: 'Manager', salary: 95000 },
    { id: 8, name: 'Abhishek Sharma', email: 'as@example.com', role: 'Designer', salary: 68000 },
  ]);
  
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredData = useMemo(() => {
    return data.filter(item =>
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Data Table with Sorting, Search & Pagination</h2>
      
      <div className="mb-4 flex items-center gap-2 bg-slate-700 p-2 rounded">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="bg-transparent flex-1 outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-600">
              {['name', 'email', 'role', 'salary'].map(key => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="text-left p-3 cursor-pointer hover:bg-slate-700"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key && (
                    <span className="ml-2">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(item => (
              <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-700">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.role}</td>
                <td className="p-3">${item.salary.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {paginatedData.length} of {sortedData.length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-slate-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-slate-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Challenge 2: Tree View / Folder Explorer
const TreeViewChallenge = () => {
  const [treeData] = useState({
    name: 'root',
    children: [
      {
        name: 'src',
        children: [
          { name: 'components', children: [{ name: 'Button.js' }, { name: 'Input.js' }] },
          { name: 'utils', children: [{ name: 'helpers.js' }] },
          { name: 'App.js' }
        ]
      },
      {
        name: 'public',
        children: [{ name: 'index.html' }, { name: 'favicon.ico' }]
      },
      { name: 'package.json' },
      { name: 'README.md' }
    ]
  });

  const TreeNode = ({ node }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="ml-4">
        <div
          className="flex items-center gap-2 py-1 cursor-pointer hover:bg-slate-700 px-2 rounded"
          onClick={() => hasChildren && setIsOpen(!isOpen)}
        >
          {hasChildren && (
            <span>{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
          )}
          <span className={hasChildren ? 'font-semibold' : ''}>{node.name}</span>
        </div>
        {isOpen && hasChildren && (
          <div>
            {node.children.map((child, idx) => (
              <TreeNode key={idx} node={child} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tree View / Folder Explorer</h2>
      <div className="bg-slate-900 p-4 rounded">
        <TreeNode node={treeData} />
      </div>
    </div>
  );
};

// Challenge 3: Dynamic Routing with Breadcrumbs
const DynamicRoutingChallenge = () => {
  const [currentPath, setCurrentPath] = useState(['home', 'products', 'electronics', 'laptops']);

  const breadcrumbs = currentPath.map((crumb, idx) => ({
    name: crumb,
    path: currentPath.slice(0, idx + 1)
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dynamic Routing with Breadcrumbs</h2>
      
      <div className="bg-slate-900 p-4 rounded mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <button
                onClick={() => setCurrentPath(crumb.path)}
                className="text-purple-400 hover:text-purple-300 capitalize"
              >
                {crumb.name}
              </button>
              {idx < breadcrumbs.length - 1 && <span className="text-gray-500">/</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 p-4 rounded">
        <h3 className="text-xl mb-2 capitalize">Current Page: {currentPath[currentPath.length - 1]}</h3>
        <p className="text-gray-400">Click breadcrumbs to navigate</p>
        
        <div className="mt-4 flex gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPath([...currentPath, 'new-section'])}
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          >
            Go Deeper
          </button>
          <button
            onClick={() => setCurrentPath(currentPath.slice(0, -1))}
            disabled={currentPath.length === 1}
            className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600 disabled:opacity-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

// Challenge 4: Notification System
const NotificationSystemChallenge = () => {
  const [notifications, setNotifications] = useState([]);
  const [pausedId, setPausedId] = useState(null);

  const addNotification = (type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, {
      id,
      type,
      message: `This is a ${type} notification`,
      timestamp: new Date()
    }]);
  };

  useEffect(() => {
    notifications.forEach(notif => {
      if (notif.id !== pausedId) {
        const timer = setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== notif.id));
        }, 5000);
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, pausedId]);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notification System</h2>
      
      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => addNotification('success')} className="px-4 py-2 bg-green-600 rounded">
          Success
        </button>
        <button onClick={() => addNotification('error')} className="px-4 py-2 bg-red-600 rounded">
          Error
        </button>
        <button onClick={() => addNotification('warning')} className="px-4 py-2 bg-yellow-600 rounded">
          Warning
        </button>
        <button onClick={() => addNotification('info')} className="px-4 py-2 bg-blue-600 rounded">
          Info
        </button>
      </div>

      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map(notif => (
          <div
            key={notif.id}
            onMouseEnter={() => setPausedId(notif.id)}
            onMouseLeave={() => setPausedId(null)}
            className={`p-4 rounded shadow-lg flex items-start gap-2 min-w-[300px] ${
              notif.type === 'success' ? 'bg-green-600' :
              notif.type === 'error' ? 'bg-red-600' :
              notif.type === 'warning' ? 'bg-yellow-600' :
              'bg-blue-600'
            }`}
          >
            <Bell size={20} />
            <div className="flex-1">
              <p className="font-semibold">{notif.type.toUpperCase()}</p>
              <p className="text-sm">{notif.message}</p>
            </div>
            <button onClick={() => removeNotification(notif.id)}>
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Challenge 5: Theme Switcher with Persistence
const ThemeSwitcherChallenge = () => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Theme Switcher with Persistence</h2>
      
      <div className={`p-8 rounded transition-colors ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>
        <h3 className="text-xl mb-4">Current Theme: {theme}</h3>
        <p className="mb-4">This component demonstrates theme switching with visual feedback.</p>
        
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            theme === 'dark' ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-white'
          }`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>

        <div className="mt-4 text-sm text-gray-500">
          Note: In a real app, use Context API and store theme in memory.
        </div>
      </div>
    </div>
  );
};

// Challenge 6: Drag-and-Drop Kanban Board
const KanbanBoardChallenge = () => {
  const [columns, setColumns] = useState({
    todo: [
      { id: 1, title: 'Design Homepage' },
      { id: 2, title: 'Setup Database' }
    ],
    inProgress: [
      { id: 3, title: 'Build API' }
    ],
    done: [
      { id: 4, title: 'Project Planning' }
    ]
  });

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (item, sourceColumn) => {
    setDraggedItem({ item, sourceColumn });
  };

  const handleDrop = (targetColumn) => {
    if (!draggedItem) return;

    const { item, sourceColumn } = draggedItem;
    
    if (sourceColumn === targetColumn) return;

    setColumns(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(i => i.id !== item.id),
      [targetColumn]: [...prev[targetColumn], item]
    }));

    setDraggedItem(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Drag-and-Drop Kanban Board</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(columns).map(([columnName, items]) => (
          <div
            key={columnName}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(columnName)}
            className="bg-slate-900 p-4 rounded"
          >
            <h3 className="font-bold mb-3 capitalize">{columnName.replace(/([A-Z])/g, ' $1')}</h3>
            <div className="space-y-2">
              {items.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item, columnName)}
                  className="bg-slate-800 p-3 rounded cursor-move hover:bg-slate-700"
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Challenge 7: Comments Thread with Nested Replies
const CommentsThreadChallenge = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      text: 'This is a great post!',
      replies: [
        { id: 2, author: 'Jane Smith', text: 'I agree!', replies: [] }
      ]
    },
    {
      id: 3,
      author: 'Bob Johnson',
      text: 'Thanks for sharing',
      replies: []
    }
  ]);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const addReply = (commentId, parentComments = comments) => {
    return parentComments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, {
            id: Date.now(),
            author: 'You',
            text: replyText,
            replies: []
          }]
        };
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReply(commentId, comment.replies)
        };
      }
      return comment;
    });
  };

  const handleSubmitReply = (commentId) => {
    if (!replyText.trim()) return;
    setComments(addReply(commentId));
    setReplyText('');
    setReplyingTo(null);
  };

  const CommentItem = ({ comment, depth = 0 }) => (
    <div className={`${depth > 0 ? 'ml-8 mt-2' : 'mb-4'} border-l-2 border-slate-700 pl-4`}>
      <div className="bg-slate-900 p-3 rounded">
        <div className="font-semibold text-sm text-purple-400">{comment.author}</div>
        <p className="mt-1">{comment.text}</p>
        <button
          onClick={() => setReplyingTo(comment.id)}
          className="text-sm text-gray-400 hover:text-white mt-2"
        >
          <MessageSquare size={14} className="inline mr-1" />
          Reply
        </button>
      </div>

      {replyingTo === comment.id && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 bg-slate-900 px-3 py-2 rounded outline-none"
          />
          <button
            onClick={() => handleSubmitReply(comment.id)}
            className="px-4 py-2 bg-purple-600 rounded"
          >
            <Send size={16} />
          </button>
        </div>
      )}

      {comment.replies.map(reply => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comments Thread with Nested Replies</h2>
      <div className="space-y-2">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

// Challenge 8: File Explorer with Lazy Loading
const FileExplorerChallenge = () => {
  const [loadedItems, setLoadedItems] = useState(20);
  const totalItems = 100;

  const items = Array.from({ length: loadedItems }, (_, i) => ({
    id: i + 1,
    name: `File ${i + 1}.txt`,
    size: `${Math.floor(Math.random() * 1000)}KB`
  }));

  const loadMore = () => {
    setLoadedItems(prev => Math.min(prev + 20, totalItems));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">File Explorer with Lazy Loading</h2>
      
      <div className="bg-slate-900 p-4 rounded h-96 overflow-y-auto">
        <div className="space-y-1">
          {items.map(item => (
            <div key={item.id} className="flex justify-between p-2 hover:bg-slate-800 rounded">
              <span>{item.name}</span>
              <span className="text-gray-400">{item.size}</span>
            </div>
          ))}
        </div>

        {loadedItems < totalItems && (
          <button
            onClick={loadMore}
            className="w-full mt-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          >
            Load More ({loadedItems} / {totalItems})
          </button>
        )}
      </div>
    </div>
  );
};

// Challenge 9: Realtime Chat UI
const RealtimeChatChallenge = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', text: 'Hey there!', time: '10:30 AM' },
    { id: 2, sender: 'You', text: 'Hi! How are you?', time: '10:31 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');

    // Simulate other user typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'Alice',
        text: 'That sounds great!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Realtime Chat UI</h2>
      
      <div className="bg-slate-900 rounded flex flex-col h-96">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'You' ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <p className="text-sm font-semibold">{msg.sender}</p>
                <p>{msg.text}</p>
                <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-700 px-4 py-2 rounded-lg">
                <span className="text-gray-400">Alice is typing...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-700 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-slate-800 px-4 py-2 rounded outline-none"
          />
          <button onClick={sendMessage} className="px-4 py-2 bg-purple-600 rounded">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Challenge 10: Dashboard with Draggable Widgets
const DashboardChallenge = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, title: 'Revenue', value: '$45,231', size: 'small' },
    { id: 2, title: 'Users', value: '1,234', size: 'small' },
    { id: 3, title: 'Chart', value: '📊', size: 'large' },
    { id: 4, title: 'Tasks', value: '23 pending', size: 'small' }
  ]);

  const [draggedWidget, setDraggedWidget] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (widget, index) => {
    setDraggedWidget({ widget, index });
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (targetIndex) => {
    if (draggedWidget === null) return;

    const newWidgets = [...widgets];
    const [removed] = newWidgets.splice(draggedWidget.index, 1);
    newWidgets.splice(targetIndex, 0, removed);

    setWidgets(newWidgets);
    setDraggedWidget(null);
    setDragOverIndex(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard with Draggable Widgets</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {widgets.map((widget, index) => (
          <div
            key={widget.id}
            draggable
            onDragStart={() => handleDragStart(widget, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            className={`bg-slate-900 p-6 rounded cursor-move hover:bg-slate-800 transition ${
              dragOverIndex === index ? 'ring-2 ring-purple-500' : ''
            } ${widget.size === 'large' ? 'col-span-2' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-gray-400">{widget.title}</h3>
              <Grip size={16} className="text-gray-500" />
            </div>
            <div className="text-3xl font-bold">{widget.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Challenge 11: Filterable & Sortable Data Table
const FilterableSortableTable = () => {
  const [data] = useState([
    { id: 1, product: 'Laptop', category: 'Electronics', price: 999, stock: 15 },
    { id: 2, product: 'Phone', category: 'Electronics', price: 699, stock: 25 },
    { id: 3, product: 'Desk', category: 'Furniture', price: 299, stock: 8 },
    { id: 4, product: 'Chair', category: 'Furniture', price: 199, stock: 12 },
    { id: 5, product: 'Monitor', category: 'Electronics', price: 399, stock: 20 }
  ]);

  const [filters, setFilters] = useState({ category: 'all', priceRange: 'all' });
  const [sortBy, setSortBy] = useState('price');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (filters.category !== 'all' && item.category !== filters.category) return false;
      if (filters.priceRange === 'low' && item.price >= 500) return false;
      if (filters.priceRange === 'high' && item.price < 500) return false;
      return true;
    }).sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);
  }, [data, filters, sortBy]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Filterable & Sortable Data Table</h2>
      
      <div className="flex gap-4 mb-4 flex-wrap">
        <div>
          <label className="text-sm text-gray-400 block mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="bg-slate-900 px-3 py-2 rounded outline-none"
          >
            <option value="all">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-1">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            className="bg-slate-900 px-3 py-2 rounded outline-none"
          >
            <option value="all">All</option>
            <option value="low">Under $500</option>
            <option value="high">$500+</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 px-3 py-2 rounded outline-none"
          >
            <option value="price">Price</option>
            <option value="stock">Stock</option>
            <option value="product">Name</option>
          </select>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left p-3">Product</th>
            <th className="text-left p-3">Category</th>
            <th className="text-left p-3">Price</th>
            <th className="text-left p-3">Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-900">
              <td className="p-3">{item.product}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">${item.price}</td>
              <td className="p-3">{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Challenge 12: Favorite/Like Button with Optimistic Updates
const OptimisticLikeButton = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'First Post', likes: 10, isLiked: false },
    { id: 2, title: 'Second Post', likes: 25, isLiked: false },
    { id: 3, title: 'Third Post', likes: 7, isLiked: true }
  ]);

  const [loading, setLoading] = useState(null);

  const handleLike = async (postId) => {
    // Optimistic update
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));

    setLoading(postId);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success - optimistic update is already applied
    } catch (error) {
      // Rollback on error
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.isLiked ? post.likes + 1 : post.likes - 1, isLiked: !post.isLiked }
          : post
      ));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Optimistic Like Button</h2>
      
      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="bg-slate-900 p-4 rounded flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-400">{post.likes} likes</p>
            </div>
            <button
              onClick={() => handleLike(post.id)}
              disabled={loading === post.id}
              className={`px-4 py-2 rounded transition ${
                post.isLiked ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-700 hover:bg-slate-600'
              } disabled:opacity-50`}
            >
              {loading === post.id ? '...' : post.isLiked ? '❤️ Liked' : '🤍 Like'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-400 bg-slate-900 p-3 rounded">
        💡 UI updates immediately (optimistic), then confirms with server
      </div>
    </div>
  );
};

// Challenge 13: Rate Limiter/Throttling Logic
const RateLimiterChallenge = () => {
  const [clicks, setClicks] = useState(0);
  const [throttledClicks, setThrottledClicks] = useState(0);
  const [debouncedClicks, setDebouncedClicks] = useState(0);

  const throttleRef = useRef(null);
  const debounceRef = useRef(null);

  const handleThrottledClick = () => {
    setClicks(prev => prev + 1);

    if (!throttleRef.current) {
      setThrottledClicks(prev => prev + 1);
      throttleRef.current = setTimeout(() => {
        throttleRef.current = null;
      }, 1000);
    }
  };

  const handleDebouncedClick = () => {
    setClicks(prev => prev + 1);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedClicks(prev => prev + 1);
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Rate Limiter & Throttling</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 p-6 rounded">
          <h3 className="font-semibold mb-3">Throttle (Max 1/sec)</h3>
          <button
            onClick={handleThrottledClick}
            className="w-full px-4 py-3 bg-purple-600 rounded hover:bg-purple-700 mb-3"
          >
            Click Me Fast!
          </button>
          <div className="text-sm space-y-1">
            <p>Total clicks: <span className="font-bold">{clicks}</span></p>
            <p>API calls: <span className="font-bold text-purple-400">{throttledClicks}</span></p>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded">
          <h3 className="font-semibold mb-3">Debounce (1sec delay)</h3>
          <button
            onClick={handleDebouncedClick}
            className="w-full px-4 py-3 bg-blue-600 rounded hover:bg-blue-700 mb-3"
          >
            Click Me Fast!
          </button>
          <div className="text-sm space-y-1">
            <p>Total clicks: <span className="font-bold">{clicks}</span></p>
            <p>API calls: <span className="font-bold text-blue-400">{debouncedClicks}</span></p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400 bg-slate-900 p-3 rounded">
        💡 Throttle: Execute immediately, then block for period. Debounce: Wait for pause before executing.
      </div>
    </div>
  );
};

// Challenge 14: Collapsible Accordion Component
const AccordionChallenge = () => {
  const [openSections, setOpenSections] = useState([]);
  const [allowMultiple, setAllowMultiple] = useState(false);

  const sections = [
    { id: 1, title: 'What is React?', content: 'React is a JavaScript library for building user interfaces.' },
    { id: 2, title: 'What are Hooks?', content: 'Hooks are functions that let you use state and other React features in functional components.' },
    { id: 3, title: 'What is JSX?', content: 'JSX is a syntax extension for JavaScript that looks similar to HTML.' }
  ];

  const toggleSection = (id) => {
    if (allowMultiple) {
      setOpenSections(prev => 
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      );
    } else {
      setOpenSections(prev => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Collapsible Accordion</h2>
      
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allowMultiple}
            onChange={(e) => setAllowMultiple(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Allow multiple sections open</span>
        </label>
      </div>

      <div className="space-y-2">
        {sections.map(section => (
          <div key={section.id} className="bg-slate-900 rounded overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-800"
            >
              <span className="font-semibold">{section.title}</span>
              {openSections.includes(section.id) ? <ChevronDown /> : <ChevronRight />}
            </button>
            
            {openSections.includes(section.id) && (
              <div className="p-4 pt-0 text-gray-300">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Challenge 15: Responsive Sidebar Navigation

const ResponsiveSidebarChallenge = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: '🏠', label: 'Home', path: '/', badge: null },
    { icon: '📊', label: 'Dashboard', path: '/dashboard', badge: '3' },
    { icon: '📧', label: 'Messages', path: '/messages', badge: '12' },
    { icon: '📁', label: 'Projects', path: '/projects', badge: null },
    { icon: '👥', label: 'Team', path: '/team', badge: null },
    { icon: '⚙️', label: 'Settings', path: '/settings', badge: null },
    { icon: '👤', label: 'Profile', path: '/profile', badge: null }
  ];

  const handleItemClick = (label) => {
    setActiveItem(label);
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Responsive Sidebar Navigation</h2>
      
      <div className="relative bg-slate-900 rounded overflow-hidden" style={{ height: '600px' }}>
        {/* Mobile/Tablet Header */}
        <div className="bg-slate-800 p-4 flex items-center justify-between xl:hidden border-b border-slate-700">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-700 rounded transition"
            >
              <Menu className={`transition-transform ${isSidebarOpen ? 'rotate-90' : ''}`} />
            </button>
            <span className="font-bold text-lg">My App</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-700 rounded transition relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
              JD
            </div>
          </div>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <aside
            className={`${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } xl:translate-x-0 fixed xl:relative z-30 bg-slate-800 ${
              isCollapsed ? 'w-20' : 'w-72'
            } h-full transition-all duration-300 border-r border-slate-700 flex flex-col`}
          >
            {/* Desktop Header */}
            <div className="p-4 hidden xl:flex items-center justify-between border-b border-slate-700">
              {!isCollapsed && <h2 className="text-xl font-bold">My App</h2>}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-slate-700 rounded transition"
              >
                {isCollapsed ? <ChevronRight size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* User Profile Section */}
            {!isCollapsed && (
              <div className="p-4 border-b border-slate-700 xl:block hidden">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                    JD
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">Piyush Garg</p>
                    <p className="text-xs text-gray-400 truncate">piyush@gmail.com</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-1">
                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleItemClick(item.label)}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center' : 'justify-start'
                    } gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeItem === item.label
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'hover:bg-slate-700 text-gray-300'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isCollapsed && item.badge && (
                      <span className="absolute right-2 top-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </nav>

            {/* Footer Section */}
            {!isCollapsed && (
              <div className="p-4 border-t border-slate-700">
                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-sm font-semibold mb-1">Upgrade to Pro</p>
                  <p className="text-xs text-gray-400 mb-2">Get unlimited access to all features</p>
                  <button className="w-full px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded text-sm transition">
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}
          </aside>

          {/* Overlay for mobile/tablet */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 xl:hidden z-20 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto">
            {/* Desktop Header */}
            <header className="hidden xl:flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
              <div>
                <h1 className="text-2xl font-bold">{activeItem}</h1>
                <p className="text-sm text-gray-400">Welcome back, Piyush!</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-slate-700 rounded-lg transition relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                  <Search size={20} />
                </button>
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer hover:ring-2 ring-purple-400 transition">
                  PG
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{activeItem} Page</h3>
                <p className="text-gray-400">This is the content area for {activeItem.toLowerCase()}</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-purple-500 transition">
                  <p className="text-sm text-gray-400 mb-1">Total Users</p>
                  <p className="text-3xl font-bold">2,543</p>
                  <p className="text-xs text-green-400 mt-1">↑ 12% from last month</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-purple-500 transition">
                  <p className="text-sm text-gray-400 mb-1">Revenue</p>
                  <p className="text-3xl font-bold">$45,231</p>
                  <p className="text-xs text-green-400 mt-1">↑ 8% from last month</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-purple-500 transition">
                  <p className="text-sm text-gray-400 mb-1">Active Projects</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-xs text-yellow-400 mt-1">→ No change</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <h4 className="font-semibold mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded transition">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                        U{i}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">User {i} completed a task</p>
                        <p className="text-xs text-gray-400">{i} hours ago</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="bg-slate-900 p-3 rounded border border-slate-700">
          <p className="text-purple-400 font-semibold mb-1">📱 Mobile/Tablet</p>
          <p className="text-gray-400 text-xs">Toggle menu with hamburger icon, overlay closes on click</p>
        </div>
        <div className="bg-slate-900 p-3 rounded border border-slate-700">
          <p className="text-purple-400 font-semibold mb-1">💻 Desktop (XL)</p>
          <p className="text-gray-400 text-xs">Collapsible sidebar, persistent navigation, icon-only mode</p>
        </div>
      </div>
    </div>
  );
};

// Challenge 16: Infinite Scroll with Intersection Observer
const InfiniteScrollChallenge = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`
  })));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, i) => ({
        id: items.length + i + 1,
        title: `Item ${items.length + i + 1}`,
        description: `This is the description for item ${items.length + i + 1}`
      }));
      
      setItems(prev => [...prev, ...newItems]);
      setLoading(false);
      
      
      if (items.length >= 90) {
        setHasMore(false);
      }
    }, 1000);
  }, [items.length, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore, hasMore]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Infinite Scroll with Intersection Observer</h2>
      
      <div className="bg-slate-900 rounded p-4 h-96 overflow-y-auto">
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-slate-800 p-4 rounded">
              <h3 className="font-semibold text-purple-400">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
        
        {hasMore && (
          <div ref={observerTarget} className="py-4 text-center">
            {loading && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>
        )}
        
        {!hasMore && (
          <div className="text-center text-gray-500 py-4">
            No more items to load
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-400 bg-slate-900 p-3 rounded">
        💡 Uses Intersection Observer API for efficient infinite scrolling. Scroll to bottom to load more!
      </div>
    </div>
  );
};

// Challenge 17: Multi-Step Form with Validation
const MultiStepFormChallenge = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    email: '',
    // Step 2
    address: '',
    city: '',
    zipCode: '',
    // Step 3
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = 'Valid email is required';
      }
    } else if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.zipCode.match(/^\d{5,6}$/)) newErrors.zipCode = 'Valid zip code required';
    } else if (step === 3) {
      if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = '16 digit card number required';
      if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) newErrors.expiryDate = 'Format: MM/YY';
      if (!formData.cvv.match(/^\d{3}$/)) newErrors.cvv = '3 digit CVV required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      alert('Form submitted successfully!');
      console.log('Form Data:', formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Address' },
    { number: 3, title: 'Payment' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Multi-Step Form with Validation</h2>
      
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                  currentStep >= step.number
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-gray-400'
                }`}
              >
                {step.number}
              </div>
              <span className="text-sm text-gray-400">{step.title}</span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 ${
                  currentStep > step.number ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      
      <div className="bg-slate-900 rounded p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full bg-slate-800 px-4 py-2 rounded outline-none"
              />
              {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full bg-slate-800 px-4 py-2 rounded outline-none"
              />
              {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-slate-800 px-4 py-2 rounded outline-none"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Address *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full bg-slate-800 px-4 py-2 rounded outline-none"
              />
              {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full bg-slate-800 px-4 py-2 rounded outline-none"
              />
              {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Zip Code *</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                className="w-full bg-slate-800 px-4 py-2 rounded outline-none"
                placeholder="12345"
              />
              {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Card Number *</label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => handleChange('cardNumber', e.target.value)}
                className="w-full bg-slate-800 px-4 py-2 rounded outline-none"
                placeholder="1234567812345678"
                maxLength="16"
              />
              {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Expiry Date *</label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => handleChange('expiryDate', e.target.value)}
                  className="w-full bg-slate-800 px-4 py-2 rounded outline-none"
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1">CVV *</label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => handleChange('cvv', e.target.value)}
                  className="w-full bg-slate-800 px-4 py-2 rounded outline-none"
                  placeholder="123"
                  maxLength="3"
                />
                {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-slate-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 rounded hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Challenge 18: Auto-Complete Search with Debouncing
const AutoCompleteChallenge = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const allItems = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'Rust',
    'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby',
    'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Laravel',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Firebase'
  ];

  // Custom debounce hook
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      // Simulate API call
      const filtered = allItems.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
      setShowDropdown(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item) => {
    setQuery(item);
    setShowDropdown(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Auto-Complete Search with Debouncing</h2>
      
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setShowDropdown(true)}
            placeholder="Search technologies..."
            className="w-full bg-slate-900 px-4 py-3 rounded outline-none pr-10"
          />
          <Search className="absolute right-3 top-3 text-gray-400" size={20} />
        </div>

        {showDropdown && (
          <div className="absolute w-full bg-slate-900 border border-slate-700 rounded mt-2 max-h-64 overflow-y-auto z-10">
            {loading ? (
              <div className="p-4 text-center text-gray-400">Searching...</div>
            ) : results.length > 0 ? (
              results.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 transition"
                >
                  {item}
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-400">No results found</div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-400 bg-slate-900 p-3 rounded">
        💡 Search is debounced by 500ms. Try typing "react" or "javascript"
      </div>
    </div>
  );
};

// Challenge 19: Image Gallery with Lightbox & Lazy Loading
const ImageGalleryChallenge = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/400/300?random=${i + 1}`,
    thumb: `https://picsum.photos/200/150?random=${i + 1}`,
    title: `Image ${i + 1}`
  }));

  const handleImageLoad = (id) => {
    setLoadedImages(prev => new Set([...prev, id]));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Image Gallery with Lightbox & Lazy Loading</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(image => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="relative bg-slate-900 rounded overflow-hidden cursor-pointer group aspect-square"
          >
            {!loadedImages.has(image.id) && (
              <div className="absolute inset-0 bg-slate-800 animate-pulse" />
            )}
            <img
              src={image.thumb}
              alt={image.title}
              loading="lazy"
              onLoad={() => handleImageLoad(image.id)}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition">
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            className="max-w-full max-h-full rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

// Challenge 20: Custom Hooks - useDebounce & usePrevious
const CustomHooksChallenge = () => {
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
  };

  
  const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(0);

  const debouncedSearch = useDebounce(searchTerm, 500);
  const previousCount = usePrevious(count);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Custom Hooks: useDebounce & usePrevious</h2>
      
      <div className="space-y-6">
        
        <div className="bg-slate-900 rounded p-6">
          <h3 className="font-semibold mb-3">useDebounce Hook</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            className="w-full bg-slate-800 px-4 py-2 rounded outline-none mb-3"
          />
          <div className="space-y-1 text-sm">
            <p className="text-gray-400">Current value: <span className="text-white">{searchTerm}</span></p>
            <p className="text-gray-400">Debounced value (500ms): <span className="text-purple-400">{debouncedSearch}</span></p>
          </div>
        </div>

      
        <div className="bg-slate-900 rounded p-6">
          <h3 className="font-semibold mb-3">usePrevious Hook</h3>
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => setCount(c => c - 1)}
              className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
            >
              -
            </button>
            <span className="text-2xl font-bold">{count}</span>
            <button
              onClick={() => setCount(c => c + 1)}
              className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
            >
              +
            </button>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-gray-400">Current count: <span className="text-white">{count}</span></p>
            <p className="text-gray-400">Previous count: <span className="text-purple-400">{previousCount ?? 'undefined'}</span></p>
          </div>
        </div>

      
        <div className="bg-slate-900 rounded p-6">
          <h3 className="font-semibold mb-3">Hook Implementations</h3>
          <pre className="text-xs text-gray-300 bg-slate-800 p-4 rounded overflow-x-auto">
{`// useDebounce Hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
};

// usePrevious Hook
const usePrevious = (value) => {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ReactInterviewChallenges;