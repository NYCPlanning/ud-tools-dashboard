
      <div class="row">
      <div class="seven columns">
        <div class="row">
          <div class="four columns">
            <h3>Scenario</h3>
            <form class="form-inline">
              <label>Scenario</label>
              <select id="type">
                <!-- POPULATE LIST FROM PLUGIN DATA -->
                <option value="Point">A</option>
                <option value="LineString">B</option>
                <option value="Polygon">C</option>
              </select>
            </form>
          </div>
          <div class="four columns"> 
            <h3>Site</h3>

            <!-- BY ID -->
            <!-- BY SELECTION -->
            <!-- AUTOMATE???-->
            <!-- BBLs -->
            <!-- Address -->

            <select id="type">
              <option value="Point">By ID</option>
              <option value="LineString">By Selection</option>
            </select>
            <input type="checkbox">Auto-zoom
            <button>Add selected lots as site</button>


          </div>
          <div class="four columns">
            <h3>Zoning</h3>
            <select id="type">
              <option value="Point">From Scenario Layer</option>
              <option value="LineString">From Site Definition</option>
              <option value="LineString">From PLUTO</option>
              <option value="Polygon">Search</option>
            </select>
            Search Value:<input type="text"/>

          </div>
        </div>
        <div class="row">
          <div class="twelve columns">
            <h3>Parameters</h3>
            <select id="type">
              <option value="Point">Select Use Combination...</option>
              <option value="LineString">Default</option>
              <option value="LineString">1st Floor Commercial</option>
              <option value="LineString">1st Floor Community Facility</option>
              <option value="LineString">1st/2nd Floor Commercial</option>
              <option value="LineString">Upper Residential</option>
              <option value="LineString">Upper Office</option>
              <option value="Polygon">Manually</option>
            </select><br>
            <input type="checkbox">Override zoning assumptions<br>
            Residential FAR <input type="text" id="fname" name="fname"><br>
            Commercial FAR <input type="text" id="fname" name="fname"><br>
            Community Facility FAR <input type="text" id="fname" name="fname"><br>
            Manufacturing FAR <input type="text" id="fname" name="fname"><br>

            Max Base Height <input type="text" id="fname" name="fname"><br>
            Max Building Height <input type="text" id="fname" name="fname"><br>
            Sky Exposure Plane <input type="text" id="fname" name="fname"><br>
            Rear Yard <input type="text" id="fname" name="fname"><br>
            Full Coverage Height <input type="text" id="fname" name="fname"><br>

            <h4>Assumptions</h4>
            <!-- Inclusionary Housing (Basic/VIH/MIH)
            Qualifying Ground Floor (OFF/ON)
            Bulk Type (Quality Housing, Height Factor, Tower-On-Base)
            Sky Exposure Plane Type (Type 1-Basic, Type 2-Alternate)
            Rear Yard for Through Lot (A-REar yard, B- Front Yard, C-Side yard)
            Residential Floor Depth Assumption (60')
            Comm/Man use (Com/Man in " vs Res in Com/Man)
            ZFA-GFA Ground Floor 1.15
            ZFA-GFA Residential 1.1
            ZFA-GFA Comm/Man 1.15
            Adjust Number 1 (10)
            Adjust Number 2 (0.5)
            100' Corner Rule (OFF/ON) -->

            <h4>Parking</h4>
            Res Parking DU Factor <input type="text" id="fname" name="fname"><br>
            Res % of DU <input type="text" id="fname" name="fname"><br>
            Res Waiver <input type="text" id="fname" name="fname"><br>
            Commercial Parking<input type="text" id="fname" name="fname"><br>
            Commercial Waiver<input type="text" id="fname" name="fname"><br>
            Commercial Loading<input type="text" id="fname" name="fname"><br>
            Community Facility Parking<input type="text" id="fname" name="fname"><br>
            Community Facility Waiver<input type="text" id="fname" name="fname"><br>
            Community Facility Loading<input type="text" id="fname" name="fname"><br>
            Manufacturing Parking<input type="text" id="fname" name="fname"><br>
            Manufacturing Waiver<input type="text" id="fname" name="fname"><br>
            Manufacturing Loading<input type="text" id="fname" name="fname"><br>
            Total Waiver<input type="text" id="fname" name="fname"><br>
            SF per Parking<input type="text" id="fname" name="fname"><br>
            SF per Loading<input type="text" id="fname" name="fname"><br>
          </div>
        </div>

      </div>
      <div class="five columns u-pull-right">
        <p>Select a Scenario, Site and Zoning District for a site to model. Once everything is set up and any assumptions are defined, click Bake to add a new Building to the model.</p>
        <button>Bake</button>
        <button>Bake Parking</button>
      </div>
    </div>