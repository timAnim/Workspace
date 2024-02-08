package gpool

// Task 任务
type Task struct {
	f func() error
}

// NewTask 新建任务
func NewTask(f func() error) *Task {
	return &Task{
		f: f,
	}
}

// Exec 执行任务
func (t *Task) Exec() {
	t.f()
}

// Pool 协程池
type Pool struct {
	nWorker int

	EntryC chan *Task
	jobsC  chan *Task
}

// NewPool 新建协程池
func NewPool(n int) *Pool {
	return &Pool{
		nWorker: n,
		EntryC:  make(chan *Task),
		jobsC:   make(chan *Task),
	}
}

func (p *Pool) worker(id int) {
	for t := range p.jobsC {
		t.Exec()
	}
}

// Run 执行任务
func (p *Pool) Run() {
	for i := 0; i < p.nWorker; i++ {
		go p.worker(i)
	}
	for t := range p.EntryC {
		p.jobsC <- t
	}
	close(p.EntryC)
	close(p.jobsC)
}
