import { useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, Check, ChevronRight, Cloud,
  Code2, ExternalLink, GitBranch, HardDrive, Layers3, Rocket,
  Server, ShieldCheck, Sparkles, Terminal, Zap
} from 'lucide-react';
import './App.css';

const checklistItems = [
  { id: 1, label: 'Create the production build', detail: 'Run npm run build and inspect the dist/ folder.' },
  { id: 2, label: 'Prepare the EC2 web server', detail: 'Use User Data to install and start Nginx.' },
  { id: 3, label: 'Publish the files to EC2', detail: 'Use SCP to copy the contents of dist/ into /var/www/html/.' },
  { id: 4, label: 'Deploy through Amplify', detail: 'Connect the repository, confirm build settings, and deploy.' },
];

const comparison = [
  { label: 'Compute & server', ec2: 'You choose and manage the instance', amplify: 'Hosting infrastructure is managed' },
  { label: 'Web server', ec2: 'You configure Nginx', amplify: 'You do not manage the web server' },
  { label: 'Build process', ec2: 'Build locally, then upload dist/', amplify: 'Build runs from your connected repository' },
  { label: 'Publish an update', ec2: 'Upload the new build yourself', amplify: 'Push a commit to trigger a new deployment' },
  { label: 'Control', ec2: 'Direct access to the server and OS', amplify: 'Less server-level control, less operations work' },
];

function App() {
  const [checked, setChecked] = useState([]);
  const [message, setMessage] = useState('Hello from the cloud!');
  const [editMode, setEditMode] = useState(false);
  const [deploymentCount, setDeploymentCount] = useState(1);
  const [activeTab, setActiveTab] = useState('ec2');

  const progress = useMemo(
    () => Math.round((checked.length / checklistItems.length) * 100),
    [checked]
  );

  const toggleItem = (id) => {
    setChecked((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Cloud Lab home">
          <span className="brand-mark"><Cloud size={21} strokeWidth={2.4} /></span>
          <span>cloud<span className="brand-light">lab</span><small> AWS SBG LAUTECH</small></span>
        </a>
        <div className="topbar-right">
          <span className="live-dot" />
          <span className="topbar-label">WORKSHOP MODE</span>
          <a className="github-link" href="https://aws.amazon.com/" target="_blank" rel="noreferrer">
            AWS Cloud <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> YOUR FIRST CLOUD DEPLOYMENT</div>
            <h1>Build it.<br /><span>Deploy it.</span><br />Understand it.</h1>
            <p className="hero-text">
              One application. Two hosting approaches. Discover what changes when you move
              from managing your own infrastructure to using a managed platform.
            </p>
            <div className="hero-actions">
              <a href="#deployment-lab" className="button button-primary">Enter the lab <ArrowRight size={17} /></a>
              <a href="#compare" className="button button-quiet">Compare approaches <ArrowDownRight size={17} /></a>
            </div>
            <div className="hero-meta">
              <span><Check size={14} /> Beginner friendly</span>
              <span><Code2 size={14} /> React + Vite</span>
              <span><ShieldCheck size={14} /> No credentials needed</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Illustration of an application deployed to the cloud">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="cloud-core"><Cloud size={58} strokeWidth={1.4} /></div>
            <div className="floating-card card-top">
              <span className="mini-icon"><Code2 size={16} /></span>
              <span><strong>Your app</strong><small>React build</small></span>
              <span className="status-tag">READY</span>
            </div>
            <div className="floating-card card-bottom">
              <span className="mini-icon mini-icon-green"><Activity size={16} /></span>
              <span><strong>Deployment</strong><small>Serving traffic</small></span>
              <span className="pulse-dot" />
            </div>
            <div className="visual-caption">FROM CODE TO CLOUD <span>01 / 02</span></div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Lab overview">
          <div className="stat"><span className="stat-icon"><Server size={18} /></span><div><strong>EC2 + Nginx</strong><small>Manage the server</small></div></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-icon stat-purple"><Zap size={18} /></span><div><strong>Amplify Hosting</strong><small>Managed deployment</small></div></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-icon stat-green"><GitBranch size={18} /></span><div><strong>Same source code</strong><small>Different workflow</small></div></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-icon stat-orange"><Layers3 size={18} /></span><div><strong>One big idea</strong><small>Choose your abstraction</small></div></div>
        </section>

        <section className="section" id="deployment-lab">
          <div className="section-heading">
            <div>
              <div className="eyebrow">01 / INTERACTIVE DEMO</div>
              <h2>Make it yours.</h2>
              <p>Change the message below. This is a tiny example of application state, right in your browser.</p>
            </div>
            <span className="section-index">CLOUD LAB / 001</span>
          </div>

          <div className="demo-grid">
            <div className="preview-panel">
              <div className="panel-topline">
                <div className="window-dots"><i /><i /><i /></div>
                <span>LIVE APP PREVIEW</span>
                <span className="preview-badge"><span /> RUNNING</span>
              </div>
              <div className="preview-content">
                <div className="preview-logo"><Cloud size={18} /> CLOUD LAB</div>
                <div className="preview-kicker">YOUR DEPLOYED APPLICATION</div>
                <h3>{message || 'Your message goes here'}</h3>
                <p>A small app can teach a big lesson about infrastructure, deployment, and ownership.</p>
                <div className="preview-footer">
                  <span><span className="tiny-green-dot" /> All systems nominal</span>
                  <span>Build #{deploymentCount.toString().padStart(3, '0')}</span>
                </div>
              </div>
            </div>

            <div className="control-panel">
              <div className="control-heading"><Terminal size={18} /><div><h3>Play with the app</h3><p>Simulate a small content update.</p></div></div>
              <label className="field-label" htmlFor="app-message">DISPLAY MESSAGE</label>
              <input
                id="app-message"
                value={message}
                maxLength={70}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type a message..."
              />
              <div className="input-foot"><span>{message.length}/70 characters</span><span>LOCAL STATE</span></div>
              <button
                className="button button-primary full-button"
                onClick={() => setDeploymentCount((count) => count + 1)}
              >
                <Rocket size={16} /> Simulate a new build <ArrowRight size={16} />
              </button>
              <p className="micro-note"><ShieldCheck size={14} /> Demo only: this button updates the preview counter. It does not deploy to AWS.</p>
            </div>
          </div>
        </section>

        <section className="section compare-section" id="compare">
          <div className="section-heading">
            <div>
              <div className="eyebrow">02 / THE BIG COMPARISON</div>
              <h2>Same app. Different responsibility.</h2>
              <p>Neither approach is automatically better. The right choice depends on what you need to control.</p>
            </div>
          </div>
          <div className="compare-tabs" role="tablist" aria-label="Deployment approach">
            <button className={activeTab === 'ec2' ? 'compare-tab active' : 'compare-tab'} onClick={() => setActiveTab('ec2')} role="tab" aria-selected={activeTab === 'ec2'}>
              <Server size={17} /> EC2 + Nginx <span>MORE CONTROL</span>
            </button>
            <button className={activeTab === 'amplify' ? 'compare-tab active amplify-active' : 'compare-tab'} onClick={() => setActiveTab('amplify')} role="tab" aria-selected={activeTab === 'amplify'}>
              <Zap size={17} /> Amplify Hosting <span>LESS SERVER WORK</span>
            </button>
          </div>

          <div className="approach-summary">
            {activeTab === 'ec2' ? (
              <>
                <div className="summary-icon"><Server size={23} /></div>
                <div><h3>You manage the hosting environment.</h3><p>Provision the instance, configure Nginx, manage access, and copy your production build to the web root.</p></div>
                <div className="summary-code">npm run build <ChevronRight size={14} /> scp <ChevronRight size={14} /> Nginx</div>
              </>
            ) : (
              <>
                <div className="summary-icon summary-icon-purple"><Zap size={23} /></div>
                <div><h3>AWS manages more of the hosting workflow.</h3><p>Connect a Git repository, configure the build, and let Amplify publish the app. New commits can trigger deployments.</p></div>
                <div className="summary-code summary-code-purple">Git push <ChevronRight size={14} /> Build <ChevronRight size={14} /> Publish</div>
              </>
            )}
          </div>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead><tr><th>RESPONSIBILITY</th><th><Server size={15} /> EC2 + NGINX</th><th><Zap size={15} /> AMPLIFY HOSTING</th></tr></thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.ec2}</td>
                    <td>{row.amplify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="comparison-note"><HardDrive size={15} /> Note: this demo is a static React frontend. A production app may also need an API, database, authentication, and other services.</p>
        </section>

        <section className="section checklist-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">03 / YOUR DEPLOYMENT CHECKLIST</div>
              <h2>Follow the journey.</h2>
              <p>Tick off each step during the workshop. Your progress stays in this page while it is open.</p>
            </div>
            <div className="progress-ring" aria-label={`${progress}% complete`}><strong>{progress}%</strong><small>COMPLETE</small></div>
          </div>
          <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
          <div className="checklist">
            {checklistItems.map((item, index) => {
              const isChecked = checked.includes(item.id);
              return (
                <button className={`checklist-item ${isChecked ? 'checked' : ''}`} key={item.id} onClick={() => toggleItem(item.id)}>
                  <span className="check-number">{isChecked ? <Check size={16} /> : String(index + 1).padStart(2, '0')}</span>
                  <span className="check-copy"><strong>{item.label}</strong><small>{item.detail}</small></span>
                  <span className="check-action">{isChecked ? 'DONE' : 'MARK DONE'} <ChevronRight size={15} /></span>
                </button>
              );
            })}
          </div>
          {progress === 100 && <div className="completion-message"><Sparkles size={17} /> Lab complete. You have seen two different paths from code to a live website!</div>}
        </section>

        <section className="takeaway">
          <div className="takeaway-icon"><Cloud size={25} /></div>
          <div><div className="eyebrow">TAKE THIS WITH YOU</div><h2>The infrastructure doesn't disappear.<br /><span>Someone still manages it.</span></h2><p>With EC2, you take on more of that responsibility. With Amplify Hosting, AWS manages more of the hosting workflow so you can focus on your application.</p></div>
          <a href="#top" className="back-top">BACK TO TOP <ArrowRight size={15} /></a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Cloud size={18} /></span><span>cloud<span className="brand-light">lab</span></span></a>
        <p>Built for learning. Deployed to understand.</p>
        <span> AWS SBG LAUTECH · WORKSHOP DEMO</span>
      </footer>
    </div>
  );
}

export default App;
