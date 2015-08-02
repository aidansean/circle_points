from project_module import project_object, image_object, link_object, challenge_object

p = project_object('circle_points', 'Circle from three points')
p.domain = 'http://www.aidansean.com/'
p.path = 'circle_points'
p.preview_image    = image_object('%s/images/project.jpg'   %p.path, 150, 250)
p.preview_image_bw = image_object('%s/images/project_bw.jpg'%p.path, 150, 250)
p.folder_name = 'aidansean'
p.github_repo_name = 'circle_points'
p.mathjax = True
p.tags = 'Maths'
p.technologies = 'canvas,HTML,JavaScript'
p.links.append(link_object(p.domain, 'circle_points/', 'Live page'))
p.introduction = 'This project was thrown together rather quickly to solve a geometrical problem: How can you analytically find the circle which passes through three given points?  The construction simply demonstrates that the method works, and it not intended to give any further information to the user.'
p.overview = '''Finding a circle which passes through \(n\) points is fairly easy to do: simply define a \(\chi^2\) and vary the centre and radius of the circle until the \(\chi^2\) is minimised.  I didn't want to pursue a numerical method because it was to be used in the aDetector project to emulate helix reconstruction, where it could be called hundreds or thousands of times per event.  Instead I opted to take triplets of points and estimate the circle properties from the triplets, hence I need a fast algorithm to find the circle that passes through three points.'''

p.challenges.append(challenge_object('The The main challenge was working through the algebra to find a solution.', 'It took a while to realise that some GCSE level geometry had the answer- a chord bisector is a diameter, so all I had to two was define two chords using the three points, find their perpendicular bisectors, and fint their point of intersection.', 'Resolved'))

p.challenges.append(challenge_object('Two points which are horizontally aligned lead to infinite gradients.', 'This was not addressed in the algorithm.  Initially I tried to rotate the points to solve the problem, but this seems like a poor solution.  Upon writing this report I realise that only one chord can ever be horizontal, leaving two other non-horizontal chords for use.', 'Solved, not implemented.'))
