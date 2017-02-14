<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>BuildBot</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    
  <div class="container">

      <!-- Static navbar -->
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">BuildBot Manager</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron">
        <h1>Build Bot Manager</h1>
        <p>Enter the repositories you want to monitor!</p>
      </div>

      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <td>Repository</td>
          </tr>
        </thead>
        <tbody>
          <?php 
		  
			include_once("db.inc");

            $sql = "SELECT * FROM `watched_repos` LIMIT 0, 30 ";

            $stmt = $pdo->query($sql);
            while ($row = $stmt->fetch())
            {
            ?>
                
              <tr>
                <td><?php echo $row['Repo']; ?>
              </tr>

           <?php } ?>
            <tr>
              <td>
                <form method="post" action="saveitem.php">
                  <div class="input-group">
                    <input name="repo" type="text" class="form-control" placeholder="Repo">
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="submit">Add</button>
                    </span>
                  </div><!-- /input-group -->
                </form>
              </td>
            </tr>
        </tbody>
      </table>



    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>