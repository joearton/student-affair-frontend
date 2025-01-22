<script lang="ts">
    import type { LayoutData } from './$types';

    const { data }: { data: LayoutData } = $props();
    const achievement = data.achievement;
</script>


<div class="container my-5 py-4 shadow bg-white">
    <div class="row">
        <div id="page-nav" class="col-md-3 lead">
            <div class="px-2 sticky-top text-end" style="top: 100px; z-index: 1000;">
                <a class="py-3 border-bottom d-block" href="#quick-info">Quick Info</a>
                <a class="py-3 border-bottom d-block" href="#students">Students</a>
                <a class="py-3 border-bottom d-block" href="#documentation">Documentation</a>
                <a class="py-3 border-bottom d-block" href="#description">Descriptions</a>
                <a class="py-3 border-bottom d-block" href="#attachment">Attachments</a>
            </div>
        </div>
        <div id="page-content" class="col-md-9 border-start">
            <div id="quick-info" class="mb-5 pb-3 border-bottom">
                <h1>{achievement.activity_name}</h1>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><i class="fas fa-calendar" style="width: 25px;"></i> {achievement.activity_date}</li>
                    <li class="list-group-item"><i class="fas fa-globe" style="width: 25px;"></i> {achievement.scope_display}</li>
                    <li class="list-group-item"><i class="fas fa-trophy" style="width: 25px;"></i> {achievement.award}</li>
                    <li class="list-group-item"><i class="fas fa-building" style="width: 25px;"></i> {achievement.organizer_name}</li>
                </ul>
            </div>
            <div id="students" class="mb-5 pb-3 border-bottom">
                <h3>Students</h3>
                {#if achievement.students.length > 0}
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Student ID</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each achievement.students as student}
                                <tr>
                                    <td>{student.name}</td>
                                    <td>{student.student_id}</td>
                                    <td>{student.department_name}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {:else}
                    <p>No students found for this achievement.</p>
                {/if}
            </div>
            <div id="documentation" class="mb-5 pb-3 border-bottom">
                <h3>Documentations</h3>
                <div id="carouselExampleIndicators" class="carousel slide w-75" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        {#each achievement.photos as photo, index}
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} class={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : 'false'} aria-label={"Slide " + (index + 1)}></button>
                        {/each}
                    </div>
                    <div class="carousel-inner">
                        {#each achievement.photos as photo, index}
                            <div class={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                                <img src={photo.image} class="d-block w-100" alt={photo.caption} />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>{photo.caption}</h5>
                                </div>
                            </div>
                        {/each}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div id="description" class="mb-5 pb-3 border-bottom">
                <h3>Descriptions</h3>
                <div class="my-3">
                    {@html achievement.description}
                </div>
            </div>
            <div id="attachments" class="mb-5 pb-3 border-bottom">
                <h3>Attachments</h3>
                {#if achievement.attachment}
                    <a href={achievement.attachment.url} class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        Download Attachment
                    </a>
                    <p class="mt-2">{achievement.attachment.name}</p>
                {/if}
            </div>
        </div>
    </div>
</div>
