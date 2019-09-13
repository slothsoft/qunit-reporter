<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<title>Test Report</title>
				<link rel="stylesheet" type="text/css"
					href="style.css" />
				<meta charset="utf-8" />
			</head>
			<body>
			<div id="content">
					<xsl:for-each select="testsuites">
						<ul id="header" class="horizontal-list">
							<li>
								<b>Runs: </b>
								<xsl:value-of select="@tests - @failures - @errors" />
								/
								<xsl:value-of select="@tests" />
							</li>
							<li>
								<span class="error">✘</span><b>Errors: </b>
								<xsl:value-of select="@errors" />
							</li>
							<li>
								<span class="failure">✘</span><b>Failures: </b>
								<xsl:value-of select="@failures" />
							</li>
						</ul>
						<xsl:for-each select="testsuite">
							<h1>
								<xsl:value-of select="@name" />
								<xsl:choose>
									<xsl:when test="@errors>0">
										<xsl:attribute name="class">error</xsl:attribute>
									</xsl:when>
									<xsl:when test="@failures>0">
										<xsl:attribute name="class">failure</xsl:attribute>
									</xsl:when>
									<xsl:otherwise>
										<xsl:attribute name="class">success</xsl:attribute>
									</xsl:otherwise>
								</xsl:choose>
							</h1>
							<ul class="testcases">
							<xsl:for-each select="testcase">
								<li>
									<xsl:choose>
										<xsl:when test="failure">
											<span class="failure">✘</span>
										</xsl:when>
										<xsl:when test="error">
											<span class="error">✘</span>
										</xsl:when>
										<xsl:otherwise>
											<span class="success">✔</span>
										</xsl:otherwise>
									</xsl:choose>
								
									<xsl:value-of select="@name" />
									
									<span class="time">
										(<xsl:value-of select="@time" />s)
									</span>
									
									<xsl:choose>
										<xsl:when test="failure/actual">
											<ul class="horizontal-list expected-actual">
												<li><b>expected: </b><xsl:value-of select="failure/expected/@value" /></li>
												<li><b>actual: </b><xsl:value-of select="failure/actual/@value" /></li>
											</ul>
										</xsl:when>
										<xsl:when test="failure/@message">
											<p class="expected-actual">
												<b><xsl:value-of select="failure/@type" />: </b>
												<xsl:value-of select="failure/@message" />
											</p>
										</xsl:when>
									</xsl:choose>
								</li>
							</xsl:for-each>
							</ul>
						</xsl:for-each>
					</xsl:for-each>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>